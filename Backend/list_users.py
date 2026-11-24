from app.db import engine
from sqlalchemy.orm import Session
from sqlalchemy import select
from app.models.user import User


with Session(engine) as session:
    users = session.scalars(select(User)).all()
    if not users:
            print("Пользователей пока нет")
    for user in users:
        print(user.id, user.public_id, user.display_name)
