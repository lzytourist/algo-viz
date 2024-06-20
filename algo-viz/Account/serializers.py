from django.contrib.auth import get_user_model, password_validation
from djoser.serializers import UserCreateSerializer
from rest_framework import serializers
from rest_framework.validators import UniqueValidator

from .models import Profile, AccountVerification

User = get_user_model()


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ('gender', 'institute')
        extra_kwargs = {
            'gender': {'required': False},
            'institute': {'required': False}
        }

    def create(self, validated_data):
        validated_data['user_id'] = self.context['request'].user.id
        return super().create(validated_data)


class CustomUserSerializer(UserCreateSerializer):
    email = serializers.CharField(
        max_length=200,
        validators=[
            UniqueValidator(
                queryset=User.objects
            )
        ]
    )

    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ('id', 'email', 'password', 'first_name', 'last_name')
        extra_kwargs = {
            'id': {'read_only': True},
            'email': {'required': True},
            'first_name': {'required': True},
            'last_name': {'required': True}
        }

    def create(self, validated_data):
        validated_data['username'] = validated_data['email']
        return super().create(validated_data)


class AccountVerificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = AccountVerification
        fields = '__all__'


class PasswordChangeSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)

    def validate_new_password(self, value):
        user = self.context['request'].user
        try:
            password_validation.validate_password(value, user)
        except password_validation.ValidationError as e:
            raise serializers.ValidationError(e.messages)
        return value

    def validate_old_password(self, value):
        user = self.context['request'].user
        if not user.check_password(value):
            raise serializers.ValidationError({"old_password": "Wrong password."})
        return value

    def save(self, **kwargs):
        user = self.context['request'].user
        user.set_password(self.validated_data['new_password'])
        user.save()
        return user
