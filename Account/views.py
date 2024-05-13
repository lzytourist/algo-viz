from djoser.views import UserViewSet
from rest_framework.generics import ListCreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Profile
from .serializers import ProfileSerializer


class ProfileListCreateAPIView(ListCreateAPIView):
    queryset = Profile.objects
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)

    def list(self, request, *args, **kwargs):
        serializer = self.get_serializer()
        profile = self.get_queryset().first()

        return Response(
            data=serializer(data=profile).data
        )


