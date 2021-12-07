from django.urls import path

from vehicles_api.views import VehiclesApiView

urlpatterns = [
    path('', VehiclesApiView.as_view())
]
