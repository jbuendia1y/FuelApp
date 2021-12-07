from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework import status

from users_api.models import UserProfile
from fuel_forms_api.models import FuelForm
from fuel_forms_api import serializers
# Create your views here.


class FuelFormsView(APIView):
    serializer_class = serializers.FuelFormSerializer

    def get(self, request: Request, format=None):
        print(UserProfile.objects.all())
        return Response(
            {
                "message": "HELLO WORLD"
            },
            status=status.HTTP_200_OK
        )

    def post(self, request: Request):
        serializer = self.serializer_class(data=request.data)
        if not serializer.is_valid():
            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST
            )

        fuel_form = FuelForm(serializer.data)
        fuel_form.compute_data()
        fuel_form.save()

        return Response(
            fuel_form.__dict__,
            status=status.HTTP_201_CREATED
        )
