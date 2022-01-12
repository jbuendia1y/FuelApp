from django.urls import path

from fuel_forms_api import views

urlpatterns = [
    path("", views.FuelFormsView.as_view()),
    path("<int:id>/", views.FuelFormView.as_view())
]
