from datetime import datetime, time
import os
import pandas as pd
import json
import crud
import models
import schemas
from utils.token import decode_token, generate_token
from utils.float_value import format_float

from constants import ADMIN_ROLE
from sqlalchemy.orm.session import Session
from utils.data_files import get_placa_from_file_name, list_data_files
from database import SessionLocal, engine

ROOT_DATA = "data"
document = os.environ.get('SUPERUSER_DOCUMENT')
password = os.environ.get('SUPERUSER_PASSWORD')
data_files = list_data_files()

placas = [file.split(" ")[3].split(".")[0] for file in data_files]


default_columns = ["FECHA", "TACOMETRO", "GALONES", "PRECIO X GLN",
                   "GASTO ABASTECIMIENTO", "KM RECORRIDO", "KM / GLN", "S/ x Km"]

db: Session = SessionLocal()


def get_df_normalized(filename):
    placa = get_placa_from_file_name(filename)
    df = pd.read_excel(
        f"{ROOT_DATA}/{filename}",
        skiprows=2,
        sheet_name=placa,
        names=["NAN", "FECHA", "TACOMETRO", "GALONES", "PRECIO X GLN",
               "GASTO ABASTECIMIENTO", "KM RECORRIDO", "KM / GLN", "S/ x Km"],
        usecols=default_columns,
        index_col=None,
    ).rename(
        # RENAME COLUMNS TO MODEL FIELDS
        columns={
            "FECHA": "created_at",
            "TACOMETRO": "hour_meter",
            "GALONES": "gallons",
            "PRECIO X GLN": "price_per_gallon",
            "GASTO ABASTECIMIENTO": "full_payment",
            "KM RECORRIDO": "km_traveled",
            "KM / GLN": "km_per_gallon",
            "S/ x Km": "pay_per_km"
        }
    )

    df.loc[0, "km_traveled"] = 0.0
    df.loc[0, "km_per_gallon"] = 0.0
    df.loc[0, "pay_per_km"] = 0.0
    df = df.dropna()

    df["hour_meter"] = df["hour_meter"].apply(lambda x: int(x))
    df["gallons"] = df["gallons"].apply(lambda x: format_float(x))
    df["price_per_gallon"] = df["price_per_gallon"].apply(
        lambda x: format_float(x))
    df["full_payment"] = df["full_payment"].apply(lambda x: format_float(x))
    df["km_traveled"] = df["km_traveled"].apply(lambda x: int(x))
    df["km_per_gallon"] = df["km_per_gallon"].apply(lambda x: format_float(x))
    df["pay_per_km"] = df["pay_per_km"].apply(lambda x: format_float(x))

    return json.loads(df.dropna().to_json(orient="records", date_format="iso"))


def save_fuel_forms(user_admin_id: int = 1):
    for filename in data_files:
        placa = get_placa_from_file_name(filename)
        for row in get_df_normalized(filename):
            vehicle_id = db.query(models.Vehicle).filter(
                models.Vehicle.placa == placa).first().id

            my_time = datetime.strptime(
                row["created_at"], "%Y-%m-%dT%H:%M:%S.%f%z")

            data = {**row, "vehicle_id": vehicle_id, "user_id": user_admin_id,
                    "created_at": my_time}
            crud.create_fuel_form(db, schemas.FuelFormCreate(**data))


def save_vehicles():
    for placa in placas:
        is_save = db.query(models.Vehicle).filter(
            models.Vehicle.placa == placa).count()

        if is_save == 0:
            crud.create_vehicle(db, schemas.VehicleCreate(placa=placa))


def init_data():
    print("Loading data ...")
    models.Base.metadata.create_all(engine)
    print("Getting user admin")
    if db.query(models.User).count() == 0:
        user_admin_id = crud.create_user(db, schemas.UserCreate(
            document=document,
            password=password,
            role=ADMIN_ROLE,
        )).id
    else:
        user_admin_id = db.query(models.User).filter(
            models.User.role == ADMIN_ROLE).first().id

    print("Loading vehicles")
    save_vehicles()
    print("Vehicles loaded")
    print("Loading fuel forms")
    save_fuel_forms(user_admin_id)
    print("Fuel forms loaded")
    print("Data loaded!")


if __name__ == "__main__":
    init_data()
