from django.urls import path

from users_api import views

urlpatterns = [
    path("login/", views.login),
    path('', views.UserView.as_view()),
]
