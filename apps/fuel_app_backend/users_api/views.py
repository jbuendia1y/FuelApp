from rest_framework import status, viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.request import Request

from rest_framework.decorators import action

from django.contrib.auth import get_user_model, login
from users_api.models import UserProfile
from users_api.serializers import UserLoginSerializer, UserModelSerializer


# Create your views here.

class UserViewSet(viewsets.GenericViewSet):
    queryset = UserProfile.objects.filter(is_active=True)
    serializer_class = UserLoginSerializer

    @action(detail=False, methods=["POST"])
    def login(self, request: Request):
        serializer = UserLoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user, token = serializer.save()

        login(request, user)

        data = {
            "user": UserModelSerializer(user).data,
            "token": token
        }

        return Response(data=data, status=status.HTTP_202_ACCEPTED)


class UsersApiView(APIView):

    def get(self, request: Request, format=None):
        users = get_user_model().objects.filter(is_staff=False, is_superuser=False)

        return Response(users.values(), status=status.HTTP_200_OK)
