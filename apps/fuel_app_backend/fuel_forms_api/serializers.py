from rest_framework import serializers


class FuelFormSerializer(serializers.Serializer):
    hour_meter = serializers.IntegerField()
    gallons = serializers.IntegerField()
    price_per_gallon = serializers.IntegerField()

    vehicle = serializers.CharField()
