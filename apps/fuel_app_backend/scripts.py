from datetime import datetime
import os
import pandas as pd
import json
import environment
from download_data import init_download
import crud
import models
import schemas
from utils.float_value import format_float

from constants import ADMIN_ROLE, CONDUCTOR_ROLE
from sqlalchemy.orm.session import Session
from utils.data_files import get_placa_from_file_name, list_forms_data_files
from database import SessionLocal, engine

ROOT_DATA = "data"
document = os.environ.get('SUPERUSER_DOCUMENT')
password = os.environ.get('SUPERUSER_PASSWORD')


default_columns = ["FECHA", "TACOMETRO", "GALONES", "PRECIO X GLN",
                   "GASTO ABASTECIMIENTO", "KM RECORRIDO", "KM / GLN", "S/ x Km"]

db: Session = SessionLocal()


def parse_date(date: str):
    return datetime.strptime(date, "%Y-%m-%dT%H:%M:%S.%f%z")


def get_df_normalized(filename):
    placa = get_placa_from_file_name(filename)
    df = pd.read_excel(
        f"{ROOT_DATA}/{environment.FORMS_FOLDER_NAME}/{filename}",
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


def get_conductores_df():
    df = pd.read_excel(
        f"{ROOT_DATA}/conductores.xlsx",
        skiprows=2,
        sheet_name="Conductores",
        names=["NAN", "ID", "NOMBRE", "APELLIDO", "DOCUMENTO",
               "BREVETE", "CATEGORIA", "EXPIRA"],
        usecols=["ID", "NOMBRE", "APELLIDO", "DOCUMENTO",
                 "BREVETE", "CATEGORIA", "EXPIRA"],
        index_col=None,
    ).rename(
        # RENAME COLUMNS TO MODEL FIELDS
        columns={
            "ID": "id",
            "NOMBRE": "first_name",
            "APELLIDO": "last_name",
            "DOCUMENTO": "document",
            "BREVETE": "license",
            "CATEGORIA": "category",
            "EXPIRA": "license_expires",
        }
    )

    df["document"] = df["document"].apply(lambda x: str(x).split(".")[0])

    return json.loads(df.dropna().to_json(orient="records", date_format="iso"))


def save_conductores():
    print("LOADING CONDUCTORES")
    conductores = get_conductores_df()
    for conductor in conductores:
        crud.create_user(db, schemas.UserCreate(
            document=conductor["document"],
            first_name=conductor["first_name"],
            last_name=conductor["last_name"],
            password=environment.DEFAULT_PASSWORD,
            role=CONDUCTOR_ROLE
        ))
    print("CONDUCTORES LOADED !!")


def save_fuel_forms(user_admin_id: int = 1, data_files: list = []):
    for filename in data_files:
        placa = get_placa_from_file_name(filename)
        for row in get_df_normalized(filename):
            vehicle_id = db.query(models.Vehicle).filter(
                models.Vehicle.placa == placa).first().id

            my_time = parse_date(row["created_at"])

            data = {**row, "vehicle_id": vehicle_id, "user_id": user_admin_id,
                    "created_at": my_time}
            crud.create_fuel_form(db, schemas.FuelFormCreate(**data))


def save_vehicles(data_files: list):
    placas = [file.split(" ")[3].split(".")[0] for file in data_files]

    for placa in placas:
        is_save = db.query(models.Vehicle).filter(
            models.Vehicle.placa == placa).count()

        if is_save == 0:
            crud.create_vehicle(db, schemas.VehicleCreate(placa=placa))


def load_data_from_data_folder(user_admin_id: int, data_files: list):
    print("Loading vehicles")

    if len(crud.get_vehicles(db)) == 0:
        save_vehicles(data_files)
        print("Vehicles loaded")
    else:
        print("VEHICLES ALREADY EXIST IN DB")

    print("Loading fuel forms")
    if len(crud.get_fuel_forms(db).data) == 0:
        save_fuel_forms(user_admin_id, data_files)
        print("Fuel forms loaded")
    else:
        print("FUEL FORMS ALREADY EXIST IN DB")


def init_data():
    data_files = list_forms_data_files()

    print("Loading data ...")
    print("Getting user admin")
    if db.query(models.User).count() == 0:
        user_admin_id = crud.create_user(db, schemas.UserCreate(
            first_name="ADMIN",
            last_name="ACCOUNT",
            document=document,
            password=password,
            role=ADMIN_ROLE,
        )).id
    else:
        user_admin_id = db.query(models.User).filter(
            models.User.role == ADMIN_ROLE).first().id

    if db.query(models.User).filter(models.User.role == CONDUCTOR_ROLE).count() == 0:
        save_conductores()
    else:
        print("CONDUCTORES ALREADY EXIST IN DB")

    if len(data_files) != 0:
        load_data_from_data_folder(user_admin_id, data_files)

    print("Data loaded!")


def main():
    models.Base.metadata.create_all(engine)

    try:
        init_download()
    except ValueError as e:
        print(e.args[0])
        return

    init_data()


if __name__ == "__main__":
    main()
    db.close()
