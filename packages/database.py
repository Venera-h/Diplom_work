from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from database_models import Base

engine = create_engine("sqlite:///packages.db", connect_args={"check_same_thread": False})

Base.metadata.create_all(engine)

SessionLocal = sessionmaker(engine)


def get_session():
    session = SessionLocal()
    try:
        yield session
    finally:
        session.close()
