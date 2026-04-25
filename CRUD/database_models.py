from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class University(Base):
    __tablename__ = "universities"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    title_cn = Column(String, nullable=True)
    description = Column(String, nullable=True)
    city = Column(String, nullable=True)
    image_url = Column(String, nullable=True)
    fee_chinese_language = Column(String, nullable=True)
    fee_bachelor_cn = Column(String, nullable=True)
    fee_bachelor_en = Column(String, nullable=True)
    fee_dormitory_single = Column(String, nullable=True)
    fee_dormitory_double = Column(String, nullable=True)
    website = Column(String, nullable=True)
    programs = relationship("Program", back_populates="university")


class Program(Base):
    __tablename__ = "programs"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(String, nullable=True)
    duration_months = Column(Integer, nullable=False)
    price = Column(Float, nullable=False)
    category = Column(String, nullable=True)
    university_id = Column(Integer, ForeignKey("universities.id"), nullable=True)
    university = relationship("University", back_populates="programs")
