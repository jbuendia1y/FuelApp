from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework import serializers, status

from rest_framework.request import Request
from rest_framework.response import Response

from vehicles_api.models import Vehicle
from vehicles_api.serializers import VehicleSerializer
# Create your views here.


class VehiclesApiView(APIView):
    serializer_class = VehicleSerializer

    def get(self, request: Request, format=None):
        vehicles = Vehicle.objects.all().values()

        return Response(
            vehicles,
            status=status.HTTP_200_OK
        )

    def post(self, request: Request):
        serializer = self.serializer_class(data=request.data)

        if not serializer.is_valid():
            raise ValueError("Placa field is not valid")

        vehicle = Vehicle(placa=serializer.data.get("placa"))
        vehicle.save()

        vehicle_saved = {
            "id": vehicle.id,
            "placa": vehicle.placa,
        }

        return Response(vehicle_saved, status=status.HTTP_200_OK)

    def delete(self, request: Request, *args):
        return Response(data={"pk": args}, status=status.HTTP_200_OK)
