from sqlalchemy.orm import Session
import models, schemas


def get_items(db: Session):
    return db.query(models.InventoryItem).all()


def create_item(db: Session, item: schemas.InventoryCreate):
    db_item = models.InventoryItem(**item.dict())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item


def delete_item(db: Session, item_id: int):
    item = db.query(models.InventoryItem).filter(models.InventoryItem.id == item_id).first()
    if item:
        db.delete(item)
        db.commit()


def update_quantity(db: Session, item_id: int, qty: int):
    item = db.query(models.InventoryItem).filter(models.InventoryItem.id == item_id).first()
    if not item:
        return None
    
    item.quantity = max(0, item.quantity + qty)
   # 👈 increment / decrement
    db.commit()
    db.refresh(item)
    return item



def get_summary(db: Session):
    items = get_items(db)
    total = len(items)
    raw = len([i for i in items if i.category.lower() == "raw"])
    finished = total - raw
    low_stock = len([i for i in items if i.quantity <= i.min_threshold])

    return {
        "total_items": total,
        "raw_materials": raw,
        "finished_goods": finished,
        "low_stock_items": low_stock
    }
