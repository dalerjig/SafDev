from getpass import getpass

from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app.db import engine
from app.models.user import User
from app.security import hash_password

user=User(public_id=11112111,
          display_name="Sarrah",
          password_hash=hash_password(getpass()))

with Session(engine) as session:
    try:
        session.add(user)
        session.commit()
        session.refresh(user)
        print(user.id, user.public_id, user.display_name)
    except IntegrityError:
        session.rollback()
        print("Ошибка")
