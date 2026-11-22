from app.config import settings
from sqlalchemy.engine import URL
from sqlalchemy import create_engine
from sqlalchemy.orm import Session

database_url=URL.create(drivername="postgresql+psycopg",
                username=settings.postgres_user,
                host=settings.postgres_host,
                port=settings.postgres_port,
                database=settings.postgres_db,
                password=settings.postgres_password.get_secret_value()
                )

engine=create_engine(database_url, hide_parameters=True)

def get_db():  
    with Session(engine) as session:
        yield session
