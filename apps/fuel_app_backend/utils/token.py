import own_exceptions
import schemas
from typing import Optional
from jose import jwt
from datetime import datetime, timedelta

from environment import JWT_ALGORITHM, JWT_SECRET_KEY


def generate_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)

    to_encode = {**to_encode, "exp": expire}
    encoded = jwt.encode(to_encode, JWT_SECRET_KEY, algorithm=JWT_ALGORITHM)

    return encoded


def decode_token(token: str):
    payload = jwt.decode(token, JWT_SECRET_KEY, algorithms=JWT_ALGORITHM)
    document = payload.get("document")
    if document is None :
        raise own_exceptions.credentials_exception
    token_data = schemas.TokenData(document=document,access_token=token,token_type="JWT")
    return token_data
