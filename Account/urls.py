from django.urls import path

from .views import ProfileListCreateAPIView

urlpatterns = [
    path('profile/', ProfileListCreateAPIView.as_view()),
]
