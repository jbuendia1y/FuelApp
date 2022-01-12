from fastapi.exceptions import HTTPException
from fastapi.params import Depends
from fastapi.security.oauth2 import OAuth2PasswordBearer
from utils.token import decode_token
from database import SessionLocal
from jose import JWTError

import own_exceptions
import crud
import schemas

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()


def get_current_user(db=Depends(get_db), token: str = Depends(oauth2_scheme)):
    try:
        token_data = decode_token(token)
    except JWTError:
        raise own_exceptions.credentials_exception
    user = crud.get_user_by_document(db, token_data.document)
    if user is None:
        raise own_exceptions.credentials_exception
    return user


def get_current_active_user(current_user: schemas.User = Depends(get_current_user)):
    if current_user.is_active == False:
        raise HTTPException(status_code=400, detail="This user's inactive")
    return current_user
