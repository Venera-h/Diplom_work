from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from database_models import OrderStatus


class OrderCreate(BaseModel):
    user_id: int
    program_id: int
    price: float
    comment: Optional[str] = None


class OrderUpdate(BaseModel):
    status: Optional[OrderStatus] = None
    comment: Optional[str] = None


class OrderOut(BaseModel):
    id: int
    user_id: int
    program_id: int
    status: OrderStatus
    comment: Optional[str]
    price: float
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
