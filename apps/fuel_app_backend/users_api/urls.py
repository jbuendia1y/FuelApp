from django.urls import path

from users_api import views

urlpatterns = [
    path('', views.UsersApiView.as_view())
]
