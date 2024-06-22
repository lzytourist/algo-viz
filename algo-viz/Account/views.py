from django.conf import settings
from djoser.views import TokenCreateView, TokenDestroyView


class CustomTokenCreateView(TokenCreateView):
    def _action(self, serializer):
        response = super()._action(serializer)

        if response.status_code == 200:
            token = response.data.get('auth_token')

            response.set_cookie(
                settings.AUTH_COOKIE,
                token,
                max_age=settings.AUTH_COOKIE_MAX_AGE,
                httponly=settings.AUTH_COOKIE_HTTPONLY,
                path=settings.AUTH_COOKIE_PATH,
                samesite=settings.AUTH_COOKIE_SAMESITE,
                secure=settings.AUTH_COOKIE_SECURE,
            )

        return response


class CustomTokenDestroyView(TokenDestroyView):
    def post(self, request):
        response = super().post(request)
        response.delete_cookie(settings.AUTH_COOKIE)
        return response
