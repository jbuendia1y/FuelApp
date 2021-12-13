from django.contrib.auth import authenticate
from rest_framework import serializers
from users_api.models import UserProfile

from rest_framework.authtoken.models import Token


class UserModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = (
            "document",
            "first_name",
            "last_name",
            "is_superuser",
            "is_staff",
            "avatar",
            "phone",
            "role"
        )


class UserLoginSerializer(serializers.Serializer):
    document = serializers.CharField(max_length=9)
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(
            document=data['document'], password=data['password'])
        if not user:
            raise serializers.ValidationError(
                'Las credenciales no son válidas')

        # Guardamos el usuario en el contexto para posteriormente en create recuperar el token
        self.context['user'] = user
        return data

    def create(self, data):
        token, created = Token.objects.get_or_create(
            user=self.context.get("user"))

        return self.context.get('user'), token.key
