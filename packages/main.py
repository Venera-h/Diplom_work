from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List

from database import get_session
from database_models import Package
from models import PackageCreate, PackageUpdate, PackageOut

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/api/packages/", response_model=PackageOut, status_code=status.HTTP_201_CREATED)
def create_package(package: PackageCreate, session: Session = Depends(get_session)):
    db_package = Package(**package.model_dump())
    session.add(db_package)
    session.commit()
    session.refresh(db_package)
    return db_package


@app.get("/api/packages/", response_model=List[PackageOut])
def get_packages(active_only: bool = False, session: Session = Depends(get_session)):
    query = session.query(Package)
    if active_only:
        query = query.filter(Package.is_active == True)
    return query.all()


@app.get("/api/packages/{package_id}", response_model=PackageOut)
def get_package(package_id: int, session: Session = Depends(get_session)):
    package = session.query(Package).filter(Package.id == package_id).first()
    if not package:
        raise HTTPException(status_code=404, detail="Package not found")
    return package


@app.patch("/api/packages/{package_id}", response_model=PackageOut)
def update_package(package_id: int, package_update: PackageUpdate, session: Session = Depends(get_session)):
    package = session.query(Package).filter(Package.id == package_id).first()
    if not package:
        raise HTTPException(status_code=404, detail="Package not found")

    for field, value in package_update.model_dump(exclude_unset=True).items():
        setattr(package, field, value)

    session.commit()
    session.refresh(package)
    return package


@app.delete("/api/packages/{package_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_package(package_id: int, session: Session = Depends(get_session)):
    package = session.query(Package).filter(Package.id == package_id).first()
    if not package:
        raise HTTPException(status_code=404, detail="Package not found")
    session.delete(package)
    session.commit()


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8003)
