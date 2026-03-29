from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from pydantic import BaseModel
from database import SessionLocal
from database_models import User
from passlib.context import CryptContext
from jose import jwt
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

SECRET_KEY = os.getenv("SECRET_KEY", "secret")
ALGORITHM = "HS256"

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto", bcrypt__rounds=12)


class UserRegister(BaseModel):
    login: str
    password: str


class UserLogin(BaseModel):
    login: str
    password: str


class TokenOut(BaseModel):
    token: str
    user_id: int


class CryptService:
    @staticmethod
    def get_hashed_password(password: str) -> str:
        return pwd_context.hash(password)

    @staticmethod
    def verify_password(password: str, hashed: str) -> bool:
        return pwd_context.verify(password, hashed)

    @staticmethod
    def create_token(user_id: int) -> str:
        return jwt.encode({"user_id": user_id}, SECRET_KEY, algorithm=ALGORITHM)


def get_session():
    session = SessionLocal()
    try:
        yield session
    finally:
        session.close()


@app.get("/health")
def health(): 
    return {"status": "ok"}

#Регистрация новых пользователей
@app.post("/api/auth/register", response_model=TokenOut)
def register_user(user_register: UserRegister, 
                  session: Session = Depends(get_session)):
    print(f"Register attempt: {user_register.login}")
    
    existing_user = session.query(User).filter(User.login == user_register.login).first()
    if existing_user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="User already exists")
    
    hashed_password = CryptService.get_hashed_password(user_register.password)
    database_user = User(login=user_register.login, hashed_password=hashed_password)
    session.add(database_user)

    session.commit()
    session.refresh(database_user)
    
    id_user = database_user.id
    token = CryptService.create_token(id_user)
    
    return TokenOut(token=token, user_id=id_user)


#Авторизация 
@app.post("/api/auth/login", response_model=TokenOut)
def login_user(user_login: UserLogin,
            session: Session = Depends(get_session)):
    print(f"Login attempt: {user_login.login}")
    user = session.query(User).filter(User.login == user_login.login).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    if not CryptService.verify_password(user_login.password, user.hashed_password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    
    token = CryptService.create_token(user.id)
    return TokenOut(token=token, user_id=user.id)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
