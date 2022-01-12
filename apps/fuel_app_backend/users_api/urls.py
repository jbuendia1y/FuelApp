from django.urls import path

from users_api import views

urlpatterns = [
    path("login/", views.LoginApiView.as_view()),
    path('', views.UsersView.as_view()),
    path('<int:id>/', views.UserProfileView.as_view())
]
