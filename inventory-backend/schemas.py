from pydantic import BaseModel


class InventoryBase(BaseModel):
    name: str
    category: str
    quantity: int
    min_threshold: int


class InventoryCreate(InventoryBase):
    pass


class Inventory(InventoryBase):
    id: int

    class Config:
        orm_mode = True
