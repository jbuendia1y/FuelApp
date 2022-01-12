from django.contrib.auth import get_user_model
from django.db import models

from users_api.models import UserProfile
from vehicles_api.models import Vehicle
# Create your models here.


class FuelForm(models.Model):
    # Datos para computar
    hour_meter = models.FloatField()
    gallons = models.FloatField()
    price_per_gallon = models.FloatField()

    vehicle = models.ForeignKey(
        Vehicle,
        on_delete=models.SET_DEFAULT,
        default=None,
    )

    # Datos del usuario que creó el formulario
    user = models.ForeignKey(
        UserProfile,
        on_delete=models.SET_DEFAULT,
        default=None
    )

    # Datos computados
    full_payment = models.FloatField()
    km_traveled = models.FloatField()
    km_per_gallon = models.FloatField()
    pay_per_km = models.FloatField()
    created_at = models.DateTimeField()


def populate_fuel_form(id: int):
    fuel_form = FuelForm.objects.filter(id=id).values()[0]
    vehicle = Vehicle.objects.filter(
        id=fuel_form.get("vehicle_id")
    ).values()[0]
    user = get_user_model().objects.filter(
        id=fuel_form.get("user_id")
    ).values()[0]

    return {
        **fuel_form,
        "vehicle": {**vehicle},
        "user": {**user}
    }
