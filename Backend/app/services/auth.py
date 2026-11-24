from sqlalchemy.exc import IntegrityError
from app.models.user import User
from sqlalchemy.orm import Session
from app.security import hash_password
import secrets

class RegistrationError(Exception):
    pass

def register_user(session: Session,
                  display_name: str,
                  password: str) -> User:
    hashed_password = hash_password(password)
    for _ in range(5):
        pub_id=secrets.randbelow(900_000) + 100_000
        user=User(public_id=pub_id,
          display_name=display_name,
          password_hash=hashed_password)
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
    raise RegistrationError("Не удалось сгенерировать уникальный pub_id после нескольких попыток.")


    

    