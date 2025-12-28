from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
import models, schemas, crud
from database import engine, SessionLocal
from fastapi.middleware.cors import CORSMiddleware   # ← ADD THIS

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Manufacturing Inventory Management System")

# ✅ ADD THIS BLOCK
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],          # allow all frontends
    allow_credentials=True,
    allow_methods=["*"],          # allow all HTTP methods
    allow_headers=["*"],          # allow all headers
)
# ✅ END BLOCK


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/")
def home():
    return {"message": "Inventory API Running"}


@app.get("/inventory", response_model=list[schemas.Inventory])
def get_items(db: Session = Depends(get_db)):
    return crud.get_items(db)


@app.post("/inventory", response_model=schemas.Inventory)
def create(item: schemas.InventoryCreate, db: Session = Depends(get_db)):
    return crud.create_item(db, item)


@app.put("/inventory/{item_id}/{qty}", response_model=schemas.Inventory)
def update(item_id: int, qty: int, db: Session = Depends(get_db)):
    return crud.update_quantity(db, item_id, qty)


@app.delete("/inventory/{item_id}")
def delete(item_id: int, db: Session = Depends(get_db)):
    crud.delete_item(db, item_id)
    return {"status": "deleted"}


@app.get("/summary")
def summary(db: Session = Depends(get_db)):

    items = crud.get_items(db)

    total_items = len(items)
    total_quantity = sum(i.quantity for i in items)
    low_stock = sum(1 for i in items if i.quantity <= i.min_threshold)

    return {
        "total_items": total_items,
        "total_quantity": total_quantity,
        "low_stock": low_stock
    }



@app.get("/alerts")
def alerts(db: Session = Depends(get_db)):
    items = crud.get_items(db)
    return [i for i in items if i.quantity <= i.min_threshold]

@app.patch("/inventory/{item_id}/{change}")
def change_quantity(item_id: int, change: int, db: Session = Depends(get_db)):

    item = db.query(models.InventoryItem).filter(models.InventoryItem.id == item_id).first()

    if not item:
        return {"error": "Item not found"}

    # Update quantity
    item.quantity += change

    # Prevent negative stock
    if item.quantity < 0:
        item.quantity = 0

    db.commit()
    db.refresh(item)

    return item
