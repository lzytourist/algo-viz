from django.urls import re_path

from .views import CustomTokenCreateView, CustomTokenDestroyView

urlpatterns = [
    re_path(r"^token/login/?$", CustomTokenCreateView.as_view(), name="login"),
    re_path(r"^token/logout/?$", CustomTokenDestroyView.as_view(), name="logout"),
]
