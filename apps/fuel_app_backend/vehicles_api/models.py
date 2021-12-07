from django.db import models

# Create your models here.


class Vehicle(models.Model):
    id = models.AutoField(primary_key=True)
    placa = models.CharField(max_length=8)
