from django.urls import path

from users_api import views

urlpatterns = [
    path("login/", views.LoginApiView.as_view()),
    path('', views.UserView.as_view()),
]
