from sqlalchemy import Column, Integer, String, Float, Boolean, JSON
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class Package(Base):
    __tablename__ = "packages"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(String, nullable=True)
    price = Column(Float, nullable=False)
    discount = Column(Float, default=0.0)  # скидка в %
    is_active = Column(Boolean, default=True)
    program_ids = Column(JSON, default=[])  # список id программ обучения
