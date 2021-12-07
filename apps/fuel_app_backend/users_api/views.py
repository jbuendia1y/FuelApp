from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.request import Request

from django.contrib.auth import get_user_model
# Create your views here.


class UsersApiView(APIView):

    def get(self, request: Request, format=None):
        users = get_user_model().objects.filter(is_staff=False)

        return Response(users.values(), status=status.HTTP_200_OK)
