import secrets
from datetime import UTC, datetime, timedelta

from sqlalchemy import select
from sqlalchemy.exc import IntegrityError, SQLAlchemyError
from sqlalchemy.orm import Session

from app.config import settings
from app.models.session import UserSession
from app.models.user import User
from app.security import (
    generate_session_token,
    hash_password,
    hash_session_token,
    verify_password,
)


class RegistrationError(Exception):
    pass


class AuthenticationError(Exception):
    pass


def register_user(session: Session, display_name: str, password: str) -> User:
    hashed_password = hash_password(password)
    for _ in range(5):
        pub_id = secrets.randbelow(900_000) + 100_000
        user = User(
            public_id=pub_id, display_name=display_name, password_hash=hashed_password
        )
        try:
            session.add(user)
            session.commit()
        except IntegrityError as exc:
            session.rollback()

            if (
                exc.orig.sqlstate == "23505"
                and exc.orig.diag.constraint_name == "users_public_id_key"
            ):
                continue

            raise

        session.refresh(user)
        return user
    raise RegistrationError(
        "Не удалось сгенерировать уникальный pub_id после нескольких попыток."
    )


def authenticate_user(session: Session, public_id: int, password: str) -> User:
    user = session.scalar(select(User).where(User.public_id == public_id))

    if user is None or not verify_password(password, user.password_hash):
        raise AuthenticationError("Неверный ID или пароль")

    return user


def create_session(session: Session, user: User) -> str:
    token = generate_session_token()
    user_session = UserSession(
        user_id=user.id,
        token_hash=hash_session_token(token),
        expires_at=datetime.now(UTC) + timedelta(seconds=settings.session_ttl_seconds),
        revoked_at=None,
    )
    try:
        session.add(user_session)
        session.commit()
    except SQLAlchemyError:
        session.rollback()
        raise
    return token


def revoke_session(session: Session, token: str | None) -> None:
    if token is None:
        return
    session_token = hash_session_token(token)
    user_session = session.scalar(
        select(UserSession).where(UserSession.token_hash == session_token)
    )
    if user_session is None or user_session.revoked_at is not None:
        return
    try:
        user_session.revoked_at = datetime.now(UTC)
        session.commit()
    except SQLAlchemyError:
        session.rollback()
        raise
