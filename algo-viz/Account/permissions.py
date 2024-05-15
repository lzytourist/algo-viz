from rest_framework.permissions import BasePermission

from .models import AccountVerification


class IsVerified(BasePermission):
    def has_permission(self, request, view):
        return AccountVerification.objects.filter(user=request.user).filter(is_verified=True).exists()


class NotVerified(BasePermission):
    def has_permission(self, request, view):
        return AccountVerification.objects.filter(user=request.user).filter(is_verified=False).exists()
