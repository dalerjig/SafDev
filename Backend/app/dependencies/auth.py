from datetime import UTC, datetime
from typing import Annotated

from fastapi import Depends, HTTPException, Request
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.config import settings
from app.db import get_db
from app.models.session import UserSession
from app.models.user import User
from app.security import hash_session_token


def require_trusted_origin(request: Request) -> None:
    if request.method not in {"POST", "PUT", "PATCH", "DELETE"}:
        return

    origin = request.headers.get("origin")

    if origin not in settings.trusted_origins:
        raise HTTPException(
            status_code=403,
            detail="Недопустимый источник запроса",
        )


def get_current_user(
    request: Request,
    session: Annotated[Session, Depends(get_db)],
) -> User:
    token = request.cookies.get("safdev_session")

    if token is None:
        raise HTTPException(
            status_code=401,
            detail="Требуется вход",
        )
    session_token = hash_session_token(token)
    user_session = session.scalar(
        select(UserSession).where(UserSession.token_hash == session_token)
    )
    if (
        user_session is None
        or user_session.revoked_at is not None
        or user_session.expires_at <= datetime.now(UTC)
    ):
        raise HTTPException(
            status_code=401,
            detail="Требуется вход",
        )
    user = session.get(User, user_session.user_id)
    if user is None:
        raise HTTPException(
            status_code=401,
            detail="Требуется вход",
        )
    return user
