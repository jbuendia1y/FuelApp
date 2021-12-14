from django.contrib.auth.base_user import BaseUserManager
from django.db import models
from django.contrib.auth.models import AbstractUser

import fuel_app_backend.constants as constanst
# Create your models here.


class UserProfileManager(BaseUserManager):

    def create_user(self, document, first_name, last_name, password=None):
        if not document:
            raise ValueError("Document field is required")

        user = self.model(
            document=document,
            first_name=first_name,
            last_name=last_name
        )

        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, document, first_name, last_name, password=None):
        user = self.create_user(document, first_name, last_name, password)

        user.is_superuser = True
        user.is_staff = True
        user.role = constanst.ADMIN_ROLE
        user.save(using=self._db)

        return user


class UserProfile(AbstractUser):
    ROLES = (
        (constanst.ADMIN_ROLE, constanst.ADMIN_ROLE),
        (constanst.SUPERVISOR_ROLE, constanst.SUPERVISOR_ROLE),
        (constanst.CONDUCTOR_ROLE, constanst.CONDUCTOR_ROLE)
    )

    id = models.AutoField(primary_key=True)

    avatar = models.TextField(
        default="https://i.picsum.photos/id/11/300/300.jpg?hmac=CziSEzrosHahJDUqPHiKx6cnAZh9zlU1VM2T52T5an8")
    phone = models.CharField(max_length=9, default="XXX XXX XXX")

    document = models.CharField(max_length=10, unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    role = models.CharField(max_length=20, choices=ROLES, null=True)

    objects = UserProfileManager()

    USERNAME_FIELD = "document"
    REQUIRED_FIELDS = ["first_name", "last_name"]

    def get_full_name(self) -> str:
        return f"{self.first_name} {self.last_name}"

    def get_short_name(self) -> str:
        first_name = str(self.first_name).split(" ")[1]
        last_name = str(self.last_name).split(" ")[0]
        return f"{first_name} {last_name}"
