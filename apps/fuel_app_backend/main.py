from typing import List
from fastapi import FastAPI
from fastapi.exceptions import HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.params import Depends
from fastapi.security.oauth2 import OAuth2PasswordRequestForm
from own_dependencies import get_db, get_current_active_user
from utils import password

import crud
import models
import schemas
import computes

app = FastAPI()

origins = [
    "http://localhost:3000",
    "http://localhost:4200",
    "http://localhost:4000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Auth


@app.post("/token", response_model=schemas.User)
def login(credentials: OAuth2PasswordRequestForm = Depends(), db=Depends(get_db)):
    c_document = credentials.username
    c_password = credentials.password

    user: models.User = crud.get_user_by_document(db, c_document)
    if user == None:
        raise HTTPException(403, "Invalid credentials")

    is_equal = password.compare_password(c_password, user.password)
    if is_equal == None:
        raise HTTPException(403, "Invalid credentials")

    return user


@app.post("/login", response_model=schemas.UserBase)
def auth_login(credentials: OAuth2PasswordRequestForm = Depends(), db=Depends(get_db)):
    c_document = credentials.username
    c_password = credentials.password

    user: models.User = crud.get_user_by_document(db, c_document)
    if user == None:
        raise HTTPException(403, "Invalid credentials")

    is_equal = password.compare_password(c_password, user.password)
    if is_equal == None:
        raise HTTPException(403, "Invalid credentials")

    return user


@app.post("/register", response_model=schemas.User)
def auth_register(user_created: schemas.UserCreate, db=Depends(get_db)):
    user_db = crud.create_user(db, user_created)
    return user_db

# Vehicles


@app.get("/vehicles", response_model=List[schemas.Vehicle])
def vehicles(db=Depends(get_db)):
    vehicles_db = crud.get_vehicles(db)
    return vehicles_db


@app.post("/vehicles", response_model=schemas.Vehicle)
def create_vehicle(vehicle: schemas.VehicleCreate, db=Depends(get_db)):
    vehicle_db = crud.create_vehicle(db, vehicle)
    return vehicle_db

# Users


@app.get("/users", response_model=List[schemas.User])
def users(db=Depends(get_db)):
    users_db = crud.get_users(db)
    return users_db


@app.get("/users/me", response_model=schemas.User)
def my_user(current_user: schemas.User = Depends(get_current_active_user)):
    return current_user


@app.get("/users/{id}", response_model=schemas.User)
def user(id: int, db=Depends(get_db)):
    user_db = crud.get_user(db, id)
    return user_db

# FuelForms


@app.get("/fuel-forms", response_model=List[schemas.FuelForm])
def fuel_forms(user_id: int = None, vehicle_id: int = None, db=Depends(get_db)):
    fuel_forms_db = crud.get_fuel_forms(
        db, user_id=user_id, vehicle_id=vehicle_id)
    return fuel_forms_db


@app.get("/fuel-forms/{id}", response_model=schemas.FuelForm)
def fuel_form(id: int, db=Depends(get_db)):
    fuel_form_db = crud.get_fuel_form(db, id)

    return fuel_form_db


@app.post("/fuel-forms", response_model=schemas.FuelForm)
def fuel_forms_post(req_fuel_form: schemas.FuelFormBase, db=Depends(get_db)):
    try:
        fuel_form_computed = computes.compute_fuel_form(db, req_fuel_form)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=e.args[0])
    fuel_form_db = crud.create_fuel_form(db, fuel_form_computed)
    return fuel_form_db
