from rest_framework import serializers
from fuel_forms_api.compute_fuel_form_data import ComputeFuelFormData
from fuel_forms_api.models import FuelForm

import datetime


class FuelFormSerializer(serializers.ModelSerializer):

    class Meta:
        model = FuelForm
        fields = [
            "hour_meter",
            "gallons",
            "price_per_gallon",
            "vehicle"
        ]

    def create(self, validated_data, user_id: int):

        vehicle_id = int(validated_data["vehicle"])

        last_form = FuelForm.objects.filter(vehicle_id=vehicle_id).last()

        computed_data = ComputeFuelFormData(
            validated_data,
            last_form
        ).compute_data()

        fuel_form_instance = FuelForm.objects.create(
            hour_meter=validated_data["hour_meter"],
            gallons=validated_data["gallons"],
            price_per_gallon=validated_data["price_per_gallon"],
            vehicle_id=vehicle_id,

            km_traveled=computed_data["km_traveled"],
            full_payment=computed_data["full_payment"],
            pay_per_km=computed_data["pay_per_km"],
            km_per_gallon=computed_data["km_per_gallon"],

            user_id=user_id,
            created_at=datetime.datetime.utcnow()
        )

        return fuel_form_instance
