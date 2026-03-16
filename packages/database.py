from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import os
from database_models import Base

engine_url = os.getenv("ENGINE_URL")

engine = create_engine(engine_url)

Base.metadata.create_all(engine)

SessionLocal = sessionmaker(engine)


def get_session():
    session = SessionLocal()
    try:
        yield session
    finally:
        session.close()
