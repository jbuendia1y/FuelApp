from fuel_app_backend import constants
from vehicles_api.models import Vehicle
from fuel_forms_api.serializers import FuelFormSerializer
from users_api.models import UserProfile

import pandas as pd
import os
import json

ROOT_DATA = "data"

data_files = os.listdir(ROOT_DATA)
placas = [file.split(" ")[3].split(".")[0]
          for file in data_files if file.endswith(".xlsx")]
dfs = {}
default_columns = ["FECHA", "TACOMETRO", "GALONES", "PRECIO X GL",
                   "GASTO ABASTECIMIENTO", "KM RECORRIDO", "KM / Gln", "S/ x Km"]

user_admin_id = UserProfile.objects.filter(
    role=constants.ADMIN_ROLE).first().__dict__["id"]


def get_placa_from_file_name(filename: str):
    return filename.split(" ")[3].split(".")[0]


def get_df_normalized(filename):
    placa = get_placa_from_file_name(filename)
    df = pd.read_excel(
        f"{ROOT_DATA}/{filename}",
        skiprows=2,
        sheet_name=placa,
        names=["NAN", "FECHA", "TACOMETRO", "GALONES", "PRECIO X GL",
               "GASTO ABASTECIMIENTO", "KM RECORRIDO", "KM / Gln", "S/ x Km"],
        usecols=default_columns,
        index_col=None,
    ).rename(
        # RENAME COLUMNS TO MODEL FIELDS
        columns={
            "FECHA": "created_at",
            "TACOMETRO": "hour_meter",
            "GALONES": "gallons",
            "PRECIO X GL": "price_per_gallon",
            "GASTO ABASTECIMIENTO": "full_payment",
            "KM RECORRIDO": "km_traveled",
            "KM / Gln": "km_per_gallon",
            "S/ x Km": "pay_per_km"
        }
    )

    df.loc[0, "km_traveled"] = 0.0
    df.dropna()
    return json.loads(df.dropna().to_json(orient="records", date_format="iso"))


def save_fuel_forms():
    for filename in data_files:
        placa = get_placa_from_file_name(filename)
        for row in get_df_normalized(filename):
            vehicle_id = Vehicle.objects.filter(
                placa=placa).first().__dict__["id"]
            data = {**row, "vehicle": vehicle_id}

            fuel_form_instance = FuelFormSerializer(
                data=data).create(data, user_admin_id)
            fuel_form_instance.save()


def save_vehicles():
    for placa in placas:
        is_save = Vehicle.objects.filter(placa=placa).count()

        if is_save == 0:
            vehicle = Vehicle(placa=placa)
            vehicle.save()


save_vehicles()
save_fuel_forms()
