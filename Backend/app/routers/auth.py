from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.services.auth import RegistrationError, register_user
from app.db import get_db
from app.schemas.auth import RegisterRequest
from app.schemas.user import UserResponse

router=APIRouter(
    prefix="/auth",
    tags=["users"]
    )

@router.post("/register", status_code=201, response_model=UserResponse)
def register(data: RegisterRequest,
            session: Session = Depends(get_db)):
    try:       
        return register_user(session=session, 
                      display_name=data.display_name, 
                      password=data.password.get_secret_value())
    except RegistrationError:
        raise HTTPException(status_code=503, 
                            detail="Не удалось завершить регистрацию, попробуйте позже.")
