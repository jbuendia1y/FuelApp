import environment
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker


engine = create_engine(
    environment.SQLALCHEMY_DATABASE_URL,
    connect_args={"check_same_thread": False} if environment.SQLALCHEMY_DATABASE_URL.startswith(
        "sqlite://") else {}
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
