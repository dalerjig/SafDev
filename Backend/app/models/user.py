from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column

from app.models.base import Base


class User(Base):
    __tablename__="users"

    id: Mapped[int] = mapped_column(primary_key=True)
    public_id: Mapped[int] = mapped_column(unique=True)
    display_name: Mapped[str] = mapped_column(String(64))
    password_hash: Mapped[str] = mapped_column(String(255))
    
