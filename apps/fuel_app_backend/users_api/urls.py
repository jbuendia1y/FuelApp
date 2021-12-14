from django.urls import path, include
from rest_framework.routers import DefaultRouter

from users_api import views

router = DefaultRouter()

router.register('', views.UserViewSet)

urlpatterns = [
    path('', views.UsersApiView.as_view()),
    path('', include(router.urls))
]
