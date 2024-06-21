from django.utils import timezone
from rest_framework.viewsets import ModelViewSet
from rest_framework.generics import ListCreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from AlgoViz.settings import EMAIL_VERIFICATION_MAIL_DELAY

from .models import Profile, AccountVerification
from .serializers import ProfileSerializer, AccountVerificationSerializer, PasswordChangeSerializer
from AlgoViz.permissions import NotVerified, IsVerified
from .utils import send_verification_email


class ProfileListCreateAPIView(ListCreateAPIView):
    queryset = Profile.objects
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated, IsVerified]

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)

    def list(self, request, *args, **kwargs):
        serializer = self.serializer_class
        profile = self.get_queryset().first()

        return Response(
            data=serializer(instance=profile).data
        )

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        profile_status = 'profile_updated'
        if serializer.is_valid(raise_exception=True):
            try:
                profile = Profile.objects.filter(user=request.user).get()
                serializer.update(profile, serializer.validated_data)
            except Profile.DoesNotExist:
                profile_status = 'profile_created'
                serializer.save()

        return Response(
            data={
                'message': 'Profile updated',
                'status': profile_status
            }
        )


class ProfileActivationView(ModelViewSet):
    queryset = Profile.objects
    serializer_class = AccountVerificationSerializer
    permission_classes = [IsAuthenticated, NotVerified]

    def create(self, request, *args, **kwargs):
        user = request.user

        try:
            previously_sent_token = AccountVerification.objects.filter(user=user).get()
        except AccountVerification.DoesNotExist:
            previously_sent_token = None

        if previously_sent_token:
            if previously_sent_token.sent_at < timezone.now() - timezone.timedelta(
                    minutes=EMAIL_VERIFICATION_MAIL_DELAY):
                send_verification_email(user, previously_sent_token)
            else:
                return Response(
                    data={
                        'message': 'Email has already been sent.',
                        'status': 'already_sent'
                    },
                    status=status.HTTP_201_CREATED
                )
        else:
            send_verification_email(user)

        return Response({
            'message': 'Mail sent',
            'status': 'mail_sent'
        }, status=status.HTTP_201_CREATED)

    def partial_update(self, request, *args, **kwargs):
        try:
            verification_token = AccountVerification.objects.filter(user=request.user).get()
            if verification_token.sent_at >= timezone.now() - timezone.timedelta(minutes=EMAIL_VERIFICATION_MAIL_DELAY):
                if int(verification_token.token) == int(request.data.get('token')):
                    user = request.user
                    user.is_verified = True
                    user.save()

                    return Response(
                        data={
                            'message': 'Email verification successful',
                            'status': 'email_verified'
                        }
                    )
        except AccountVerification.DoesNotExist:
            pass

        return Response(
            data={
                'message': 'Token does not match or may have been expired',
                'status': 'token_error'
            },
            status=status.HTTP_400_BAD_REQUEST
        )


class PasswordChangeView(APIView):
    permission_classes = [IsAuthenticated, IsVerified]
    serializer_class = PasswordChangeSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data, context={'request': request})
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({
                "message": "Password changed successfully."
            }, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
