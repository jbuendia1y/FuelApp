from django.contrib import admin

from fuel_forms_api.models import FuelForm

# Register your models here.


class FuelFormAdmin(admin.ModelAdmin):
    fields = [
        "hour_meter",
        "gallons",
        "price_per_gallon",
        "vehicle",
        "user",
        "created_at"
    ]


admin.site.register(FuelForm, FuelFormAdmin)
