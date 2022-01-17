import environment
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

if environment.SQLALCHEMY_DATABASE_URL.startswith("sqlite://"):
    connect_args = {"check_same_thread": False},
else:
    connect_args = {}


engine = create_engine(
    environment.SQLALCHEMY_DATABASE_URL,
    connect_args=connect_args
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
