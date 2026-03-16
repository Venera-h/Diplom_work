from pydantic import BaseModel
from typing import Optional, List


class PackageCreate(BaseModel):
    title: str
    description: Optional[str] = None
    price: float
    discount: float = 0.0
    program_ids: List[int] = []


class PackageUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    price: Optional[float] = None
    discount: Optional[float] = None
    is_active: Optional[bool] = None
    program_ids: Optional[List[int]] = None


class PackageOut(BaseModel):
    id: int
    title: str
    description: Optional[str]
    price: float
    discount: float
    is_active: bool
    program_ids: List[int]

    class Config:
        from_attributes = True
