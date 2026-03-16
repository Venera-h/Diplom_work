from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from models import Program, ProgramCreate, ProgramUpdate
from typing import List

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

programs_db = {}
next_id = 1


@app.get("/")
def read_root():
    return {"message": "Education Programs API"}


@app.post("/programs/", response_model=Program)
def create_program(program: ProgramCreate):
    global next_id
    program_dict = program.model_dump()
    program_dict["id"] = next_id
    programs_db[next_id] = program_dict
    next_id += 1
    return program_dict


@app.get("/programs/", response_model=List[Program])
def get_programs():
    return list(programs_db.values())


@app.get("/programs/{program_id}", response_model=Program)
def get_program(program_id: int):
    if program_id not in programs_db:
        raise HTTPException(status_code=404, detail="Program not found")
    return programs_db[program_id]


@app.put("/programs/{program_id}", response_model=Program)
def update_program(program_id: int, program: ProgramUpdate):
    if program_id not in programs_db:
        raise HTTPException(status_code=404, detail="Program not found")
    
    stored_program = programs_db[program_id]
    update_data = program.model_dump(exclude_unset=True)
    stored_program.update(update_data)
    return stored_program


@app.delete("/programs/{program_id}")
def delete_program(program_id: int):
    if program_id not in programs_db:
        raise HTTPException(status_code=404, detail="Program not found")
    del programs_db[program_id]
    return {"message": "Program deleted"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8001)
