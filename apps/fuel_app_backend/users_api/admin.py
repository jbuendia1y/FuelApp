from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from users_api.models import UserProfile

# Register your models here.


admin.site.register(UserProfile, UserAdmin)
