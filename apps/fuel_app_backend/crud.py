from utils.password import hash_password
from sqlalchemy.orm.session import Session
from sqlalchemy.orm.query import Query
import models
import schemas
import environment
import math


def get_pagination(query: Query, page: int, limit: int = environment.ITEMS_PER_PAGE):
    total_items = query.count()
    total_pages = math.ceil(total_items / limit)

    q_offset = (page - 1) * limit

    data = query.offset(q_offset).limit(limit).all()

    db_page = schemas.Page(
        data=data,
        page=page,
        limit=limit,
        total_pages=total_pages,
        total_items=total_items,
    )

    return db_page

# User functions


def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()


def get_user_by_document(db: Session, document: str):
    return db.query(models.User).filter(models.User.document == document).first()


def get_users(db: Session):
    return db.query(models.User).all()


def create_user(db: Session, user: schemas.UserCreate):
    h_password = hash_password(user.password)

    db_user = models.User(**{**user.dict(), "password": h_password})
    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    return db_user

# Vehicle functions


def get_vehicle(db: Session, id: int):
    return db.query(models.Vehicle).filter(models.Vehicle.id == id).first()


def get_vehicles(db: Session):
    return db.query(models.Vehicle).all()


def create_vehicle(db: Session, vehicle: schemas.VehicleCreate):
    db_vehicle = models.Vehicle(**vehicle.dict())

    db.add(db_vehicle)
    db.commit()
    db.refresh(db_vehicle)

    return db_vehicle

# FuelForm functions


def get_fuel_form(db: Session, fuel_form_id: int):
    """ ## Function
        Returns fuel_form populated
    """

    fuel_form_db = db.query(models.FuelForm).filter(
        models.FuelForm.id == fuel_form_id).first()
    vehicle = get_vehicle(db, fuel_form_db.vehicle_id)
    user = get_user(db, fuel_form_db.user_id)

    return {**fuel_form_db.__dict__, "vehicle": vehicle, "user": user}


def get_fuel_forms(db: Session, user_id: int = None, vehicle_id: int = None, page: int = 1, limit: int = environment.ITEMS_PER_PAGE):
    make_query = db.query(models.FuelForm)
    if user_id != None:
        make_query = make_query.filter(models.FuelForm.user_id == user_id)
    if vehicle_id != None:
        make_query = make_query.filter(
            models.FuelForm.vehicle_id == vehicle_id)

    f_query = get_pagination(make_query, page, limit)

    return f_query


def create_fuel_form(db: Session, fuel_form: schemas.FuelFormCreate):
    db_fuel_form = models.FuelForm(**fuel_form.dict())

    db.add(db_fuel_form)
    db.commit()
    db.refresh(db_fuel_form)

    return db_fuel_form
