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
