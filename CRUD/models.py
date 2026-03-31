from pydantic import BaseModel
from typing import Optional, List


class ProgramCreate(BaseModel):
    title: str
    description: str
    duration_months: int
    price: float
    university_id: Optional[int] = None


class ProgramUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    duration_months: Optional[int] = None
    price: Optional[float] = None
    university_id: Optional[int] = None


class Program(BaseModel):
    id: int
    title: str
    description: str
    duration_months: int
    price: float
    university_id: Optional[int]

    class Config:
        from_attributes = True


class UniversityCreate(BaseModel):
    title: str
    description: Optional[str] = None
    city: Optional[str] = None
    image_url: Optional[str] = None


class UniversityUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    city: Optional[str] = None
    image_url: Optional[str] = None


class University(BaseModel):
    id: int
    title: str
    description: Optional[str]
    city: Optional[str]
    image_url: Optional[str]
    programs: List[Program] = []

    class Config:
        from_attributes = True
