from django.contrib import admin

from vehicles_api.models import Vehicle

# Register your models here.


admin.site.register(Vehicle, admin.ModelAdmin)
