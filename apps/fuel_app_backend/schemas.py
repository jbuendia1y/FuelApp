from datetime import datetime
from typing import Optional, TypeVar, List
from pydantic import BaseModel


class Credentials(BaseModel):
    document: str
    password: str


class UserBase(BaseModel):
    document: str
    role: str


class UserCreate(UserBase):
    first_name: str
    last_name: str
    password: str

    avatar: str = "https://i.picsum.photos/id/11/300/300.jpg?hmac=CziSEzrosHahJDUqPHiKx6cnAZh9zlU1VM2T52T5an8"
    phone: str = "XXX XXX XXX"


class User(UserCreate):
    id: int

    is_active: bool = True

    class Config:
        orm_mode = True


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(Token):
    document: Optional[str] = None


class VehicleBase(BaseModel):
    placa: str


class VehicleCreate(VehicleBase):
    pass


class Vehicle(VehicleCreate):
    id: int

    class Config:
        orm_mode = True


class FuelFormBase(BaseModel):
    # Datos para computar
    hour_meter: int
    gallons: float
    price_per_gallon: float

    vehicle_id: int
    user_id: int


class FuelFormCreate(FuelFormBase):
    # Datos computados
    full_payment: float
    km_traveled: int
    km_per_gallon: float
    pay_per_km: float
    created_at: datetime


class FuelForm(FuelFormCreate):
    id: int

    class Config:
        orm_mode = True

T = TypeVar("T")


class Page(BaseModel):
    data:List[T]
    page:int
    limit:int
    total_pages:int
    total_items : int