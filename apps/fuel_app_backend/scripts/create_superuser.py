from fuel_app_backend import constants
from users_api.models import UserProfile
import os
import django
django.setup()

document = os.environ.get('SUPERUSER_DOCUMENT')
password = os.environ.get('SUPERUSER_PASSWORD')


def create_superuser():
    user = UserProfile(document=document)
    user.set_password(password)

    user.is_superuser = True
    user.is_staff = True

    user.role = constants.ADMIN_ROLE
    user.save()


accounts = UserProfile.objects.filter(document=document).count()

if accounts == 0:
    create_superuser()
