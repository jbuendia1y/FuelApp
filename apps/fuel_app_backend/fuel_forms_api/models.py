from django.db import models

from users_api.models import UserProfile
from vehicles_api.models import Vehicle
# Create your models here.


class FuelForm(models.Model):
    # Datos para computar
    hour_meter = models.IntegerField()
    gallons = models.IntegerField()
    price_per_gallon = models.IntegerField()

    vehicle = models.ForeignKey(
        Vehicle,
        on_delete=models.CASCADE,
        default=None
    )

    # Datos del usuario que creó el formulario
    user = models.ForeignKey(
        UserProfile,
        on_delete=models.SET_DEFAULT,
        default=None
    )

    # Datos computados
    full_payment = models.IntegerField()
    km_traveled = models.IntegerField()
    km_per_gallon = models.IntegerField()
    pay_per_km = models.IntegerField()
    created_at = models.DateTimeField()

    def compute_data(self):
        # First
        self.__compute_km_traveled()
        # Second
        self.__compute_full_payment()
        # Third
        self.__compute_pay_per_km()
        # Fourth
        self.__compute_km_per_gallon()

    def __compute_km_traveled(self):
        last_form = FuelForm.objects.filter(vehicle=self.vehicle).last()
        if last_form:
            self.km_traveled = self.hour_meter - last_form.hour_meter
        self.km_traveled = 0

    def __compute_full_payment(self):
        self.full_payment = self.price_per_gallon * self.gallons

    def __compute_pay_per_km(self):
        if self.km_traveled == 0:
            self.pay_per_km = 0
        else:
            self.pay_per_km = self.full_payment / self.km_traveled

    def __compute_km_per_gallon(self):
        self.km_per_gallon = self.km_traveled / self.gallons
