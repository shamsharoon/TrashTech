# pwa/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path("", views.home, name="home"),
    path("analyze_picture/", views.analyze_picture, name="analyze_picture"),
    path("app/", views.app, name="app"),
]
