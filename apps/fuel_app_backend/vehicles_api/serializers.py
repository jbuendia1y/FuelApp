from rest_framework import serializers


class VehicleSerializer(serializers.Serializer):
    placa = serializers.CharField(max_length=9)
