from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List

from database import get_session
from database_models import University as UniversityModel, Program as ProgramModel
from models import (
    Program, ProgramCreate, ProgramUpdate,
    University, UniversityCreate, UniversityUpdate
)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


# --- Университеты ---

@app.post("/universities/", response_model=University)
def create_university(university: UniversityCreate, session: Session = Depends(get_session)):
    db_university = UniversityModel(**university.model_dump())
    session.add(db_university)
    session.commit()
    session.refresh(db_university)
    return db_university


@app.get("/universities/", response_model=List[University])
def get_universities(session: Session = Depends(get_session)):
    return session.query(UniversityModel).all()


@app.get("/universities/{university_id}", response_model=University)
def get_university(university_id: int, session: Session = Depends(get_session)):
    university = session.query(UniversityModel).filter(UniversityModel.id == university_id).first()
    if not university:
        raise HTTPException(status_code=404, detail="University not found")
    return university


@app.patch("/universities/{university_id}", response_model=University)
def update_university(university_id: int, university: UniversityUpdate, session: Session = Depends(get_session)):
    db_university = session.query(UniversityModel).filter(UniversityModel.id == university_id).first()
    if not db_university:
        raise HTTPException(status_code=404, detail="University not found")
    for field, value in university.model_dump(exclude_unset=True).items():
        setattr(db_university, field, value)
    session.commit()
    session.refresh(db_university)
    return db_university


@app.delete("/universities/{university_id}")
def delete_university(university_id: int, session: Session = Depends(get_session)):
    db_university = session.query(UniversityModel).filter(UniversityModel.id == university_id).first()
    if not db_university:
        raise HTTPException(status_code=404, detail="University not found")
    session.delete(db_university)
    session.commit()
    return {"message": "University deleted"}


# --- Программы ---

@app.post("/programs/", response_model=Program)
def create_program(program: ProgramCreate, session: Session = Depends(get_session)):
    db_program = ProgramModel(**program.model_dump())
    session.add(db_program)
    session.commit()
    session.refresh(db_program)
    return db_program


@app.get("/programs/", response_model=List[Program])
def get_programs(session: Session = Depends(get_session)):
    return session.query(ProgramModel).all()


@app.get("/programs/{program_id}", response_model=Program)
def get_program(program_id: int, session: Session = Depends(get_session)):
    program = session.query(ProgramModel).filter(ProgramModel.id == program_id).first()
    if not program:
        raise HTTPException(status_code=404, detail="Program not found")
    return program


@app.put("/programs/{program_id}", response_model=Program)
def update_program(program_id: int, program: ProgramUpdate, session: Session = Depends(get_session)):
    db_program = session.query(ProgramModel).filter(ProgramModel.id == program_id).first()
    if not db_program:
        raise HTTPException(status_code=404, detail="Program not found")
    for field, value in program.model_dump(exclude_unset=True).items():
        setattr(db_program, field, value)
    session.commit()
    session.refresh(db_program)
    return db_program


@app.delete("/programs/{program_id}")
def delete_program(program_id: int, session: Session = Depends(get_session)):
    db_program = session.query(ProgramModel).filter(ProgramModel.id == program_id).first()
    if not db_program:
        raise HTTPException(status_code=404, detail="Program not found")
    session.delete(db_program)
    session.commit()
    return {"message": "Program deleted"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8001)
