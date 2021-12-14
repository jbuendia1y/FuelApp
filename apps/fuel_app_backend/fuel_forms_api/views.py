from django.contrib.auth.models import AnonymousUser
from django.core import serializers as djangoSerializers

from rest_framework.views import APIView
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework import status

from fuel_forms_api.models import FuelForm
from fuel_forms_api import serializers
# Create your views here.

import json


class FuelFormsView(APIView):
    serializer_class = serializers.FuelFormSerializer

    def get(self, request: Request, format=None):
        data = FuelForm.objects.all()

        return Response(
            data.values(),
            status=status.HTTP_200_OK
        )

    def post(self, request: Request):

        if request.user is AnonymousUser:
            return Response(data={
                "message": "You need a account"
            }, status=status.HTTP_401_UNAUTHORIZED)

        serializer = self.serializer_class(data=request.data)
        if not serializer.is_valid():
            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST
            )

        fuel_form_instance = serializer.create(
            serializer.data,
            request.user.id
        )
        fuel_form = FuelForm.objects.filter(pk=fuel_form_instance.id)

        return Response(
            data=fuel_form.values(),
            status=status.HTTP_201_CREATED
        )

    def delete(self, request: Request):
        forms = FuelForm.objects.all().delete()

        return Response(data={
            "message": "Succesfully"
        }, status=status.HTTP_200_OK)
