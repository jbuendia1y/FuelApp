from django.urls import path

from fuel_forms_api import views

urlpatterns = [
    path("", views.FuelFormsView.as_view())
]
