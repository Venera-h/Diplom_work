from pydantic import BaseModel
from typing import Optional


class ProgramBase(BaseModel):
    title: str
    description: str
    duration_months: int
    price: float


class ProgramCreate(ProgramBase):
    pass


class ProgramUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    duration_months: Optional[int] = None
    price: Optional[float] = None


class Program(ProgramBase):
    id: int

    class Config:
        from_attributes = True
