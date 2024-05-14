from django.urls import path

from .views import ProfileListCreateAPIView, ProfileActivationView

urlpatterns = [
    path('profile/', ProfileListCreateAPIView.as_view()),
    path('profile/account-verification/', ProfileActivationView.as_view({
        'post': 'create',
        'patch': 'partial_update',
    }))
]
