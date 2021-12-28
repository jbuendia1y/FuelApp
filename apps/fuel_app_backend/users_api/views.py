from rest_framework import status
from rest_framework.response import Response
from rest_framework.request import Request

from rest_framework.decorators import api_view

from django.contrib.auth import get_user_model, login
from rest_framework.views import APIView
from fuel_app_backend.constants import ADMIN_ROLE, CONDUCTOR_ROLE, SUPERVISOR_ROLE
from users_api.serializers import UserLoginSerializer, UserModelSerializer


# Create your views here.

class LoginApiView(APIView):
    def post(self, request: Request):
        serializer = UserLoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user, token = serializer.save()

        login(request, user)

        data = {
            "user": UserModelSerializer(user).data,
            "token": token
        }

        return Response(data=data, status=status.HTTP_202_ACCEPTED)


class UserView(APIView):
    def get(self, request: Request):
        role = request.query_params.get("role", CONDUCTOR_ROLE)
        role = role[0].upper() + f"{role.split(role[0])[1]}"

        is_role = role in [ADMIN_ROLE, SUPERVISOR_ROLE, CONDUCTOR_ROLE]

        if is_role == False:
            return Response(data={
                "message": f"The role: {role} not exist in the database"
            }, status=status.HTTP_404_NOT_FOUND)

        filters = {
            "is_staff": False,
            "is_superuser": False,
            "role": role
        }

        if role == ADMIN_ROLE:
            filters = {
                "role": role
            }

        users = get_user_model().objects.filter(**filters)
        return Response(data=users.values(), status=status.HTTP_200_OK)
