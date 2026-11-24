from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, Response
from sqlalchemy.orm import Session

from app.config import settings
from app.db import get_db
from app.schemas.auth import LoginRequest, RegisterRequest
from app.schemas.user import UserResponse
from app.services.auth import (
    AuthenticationError,
    RegistrationError,
    authenticate_user,
    create_session,
    register_user,
)

router = APIRouter(prefix="/auth", tags=["users"])


@router.post("/register", status_code=201, response_model=UserResponse)
def register(data: RegisterRequest, session: Annotated[Session, Depends(get_db)]):
    try:
        return register_user(
            session=session,
            display_name=data.display_name,
            password=data.password.get_secret_value(),
        )
    except RegistrationError:
        raise HTTPException(
            status_code=503,
            detail="Не удалось завершить регистрацию, попробуйте позже.",
        )


@router.post("/login", status_code=200, response_model=UserResponse)
def login(
    data: LoginRequest, response: Response, session: Annotated[Session, Depends(get_db)]
):
    try:
        user = authenticate_user(
            session=session,
            public_id=data.public_id,
            password=data.password.get_secret_value(),
        )
        token = create_session(session, user)
    except AuthenticationError:
        raise HTTPException(
            status_code=401,
            detail="Неверный ID или пароль.",
        )
    response.set_cookie(
        key="safdev_session",
        value=token,
        max_age=settings.session_ttl_seconds,
        httponly=True,
        samesite="lax",
        secure=False,
        path="/",
    )
    return user
