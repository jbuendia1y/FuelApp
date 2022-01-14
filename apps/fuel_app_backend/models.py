from datetime import datetime
from sqlalchemy import Boolean, Column, Integer, String, ForeignKey, Float, DateTime

from database import Base

import constants


class User(Base):
    __tablename__ = constants.USERS_TABLE_NAME

    id = Column(Integer, primary_key=True, index=True)
    document = Column(String, unique=True, index=True)
    password = Column(String)

    avatar = Column(
        String,
        default="https://i.picsum.photos/id/11/300/300.jpg?hmac=CziSEzrosHahJDUqPHiKx6cnAZh9zlU1VM2T52T5an8")
    phone = Column(String, default="XXX XXX XXX")

    role = Column(String, default=constants.CONDUCTOR_ROLE)

    is_active = Column(Boolean, default=True)

    def __str__(self) -> str:
        return self.document


class Vehicle(Base):
    __tablename__ = constants.VEHICLES_TABLE_NAME

    id = Column(Integer, primary_key=True, index=True)
    placa = Column(String(7), unique=True)

    def __str__(self) -> str:
        return self.placa


class FuelForm(Base):
    __tablename__ = constants.FUELFORMS_TABLE_NAME

    id = Column(Integer, primary_key=True, index=True)

    # Datos para computar
    hour_meter = Column(Integer)
    gallons = Column(Float)
    price_per_gallon = Column(Float)

    vehicle_id = Column(Integer, ForeignKey(
        constants.VEHICLES_TABLE_NAME+".id"))

    # Datos del usuario que creó el formulario
    user_id = Column(Integer, ForeignKey(constants.USERS_TABLE_NAME+".id"))

    # Datos computados
    full_payment = Column(Float)
    km_traveled = Column(Integer)
    km_per_gallon = Column(Float)
    pay_per_km = Column(Float)
    created_at = Column(DateTime, default=datetime.now())
