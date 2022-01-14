from sqlalchemy.orm.session import Session
from utils.password import compare_password
import crud
import models


def authenticate_user(db: Session, document: str, password: str):
    user: models.User = crud.get_user_by_document(db, document)
    if user == None:
        raise ValueError("Invalid credentials")

    is_equal = compare_password(password, user.password)
    if is_equal == None:
        raise ValueError("Invalid credentials")

    return user
