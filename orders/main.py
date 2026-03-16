from fastapi import FastAPI, HTTPException, Depends, status
from sqlalchemy.orm import Session
from typing import List

from database import get_session
from database_models import Order, OrderStatus
from models import OrderCreate, OrderUpdate, OrderOut

app = FastAPI()


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/api/orders/", response_model=OrderOut, status_code=status.HTTP_201_CREATED)
def create_order(order: OrderCreate, session: Session = Depends(get_session)):
    db_order = Order(**order.model_dump())
    session.add(db_order)
    session.commit()
    session.refresh(db_order)
    return db_order


@app.get("/api/orders/", response_model=List[OrderOut])
def get_orders(session: Session = Depends(get_session)):
    return session.query(Order).all()


@app.get("/api/orders/{order_id}", response_model=OrderOut)
def get_order(order_id: int, session: Session = Depends(get_session)):
    order = session.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return order


@app.get("/api/orders/user/{user_id}", response_model=List[OrderOut])
def get_user_orders(user_id: int, session: Session = Depends(get_session)):
    return session.query(Order).filter(Order.user_id == user_id).all()


@app.patch("/api/orders/{order_id}", response_model=OrderOut)
def update_order(order_id: int, order_update: OrderUpdate, session: Session = Depends(get_session)):
    order = session.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")

    for field, value in order_update.model_dump(exclude_unset=True).items():
        setattr(order, field, value)

    session.commit()
    session.refresh(order)
    return order


@app.delete("/api/orders/{order_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_order(order_id: int, session: Session = Depends(get_session)):
    order = session.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    session.delete(order)
    session.commit()


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8002)
