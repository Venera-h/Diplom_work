from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class University(Base):
    __tablename__ = "universities"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(String, nullable=True)
    city = Column(String, nullable=True)
    image_url = Column(String, nullable=True)
    programs = relationship("Program", back_populates="university")


class Program(Base):
    __tablename__ = "programs"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(String, nullable=True)
    duration_months = Column(Integer, nullable=False)
    price = Column(Float, nullable=False)
    university_id = Column(Integer, ForeignKey("universities.id"), nullable=True)
    university = relationship("University", back_populates="programs")
