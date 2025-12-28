"""Database model definition for inventory items."""

from sqlalchemy import Column, Integer, String
from database import Base


class InventoryItem(Base):
    """Database model for inventory items"""

    __tablename__ = "inventory"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    category = Column(String)  # Raw or Finished
    quantity = Column(Integer)
    min_threshold = Column(Integer)
