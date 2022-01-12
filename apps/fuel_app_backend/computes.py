from sqlalchemy.orm.session import Session
from utils.float_value import format_float
import schemas
import crud


def compute_km_traveled(fuel_form, last_fuel_form=None):
    last_hour_meter = last_fuel_form.hour_meter
    hour_meter = fuel_form.hour_meter

    if last_hour_meter == None:
        return 0
    else:
        return format_float(hour_meter - last_hour_meter)


def compute_full_payment(fuel_form):
    return format_float(fuel_form.gallons * fuel_form.price_per_gallon)


def compute_pay_per_km(km_traveled, full_payment):
    if km_traveled == 0:
        return 0

    else:
        return format_float(full_payment / km_traveled)


def compute_km_per_gallons(km_traveled, gallons):
    return format_float(km_traveled / gallons)


def compute_fuel_form(db: Session, fuel_form: schemas.FuelFormBase):
    vehicle_id = fuel_form.vehicle_id
    fuel_forms = crud.get_fuel_forms(db, vehicle_id=vehicle_id)

    if len(fuel_forms) == 0:
        raise ValueError("vehicle_id incorrect")

    last_fuel_form = fuel_forms[len(fuel_forms) - 1]

    km_traveled = compute_km_traveled(
        fuel_form.hour_meter, last_fuel_form.hour_meter)
    full_payment = compute_full_payment(fuel_form)
    pay_per_km = compute_pay_per_km(km_traveled, full_payment)
    km_per_gallon = compute_km_per_gallons(km_traveled, fuel_form.gallons)

    computed_data = {
        "km_traveled": km_traveled,
        "full_payment": full_payment,
        "pay_per_km": pay_per_km,
        "km_per_gallon": km_per_gallon
    }

    return schemas.FuelFormCreate({
        **fuel_form.dict(),
        **computed_data
    })
