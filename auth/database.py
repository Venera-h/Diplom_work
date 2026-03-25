from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from database_models import Base, User

engine = create_engine("sqlite:///auth.db", connect_args={"check_same_thread": False})

Base.metadata.create_all(engine)

SessionLocal = sessionmaker(engine)