from django.urls import path

from .views import ProfileListCreateAPIView, ProfileActivationView, PasswordChangeView

urlpatterns = [
    path('profile/', ProfileListCreateAPIView.as_view()),
    path('profile/account-verification/', ProfileActivationView.as_view({
        'post': 'create',
        'patch': 'partial_update',
    })),
    path('profile/password/change/', PasswordChangeView.as_view()),
]
