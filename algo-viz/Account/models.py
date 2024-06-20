from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    is_verified = models.BooleanField(default=False)


class Profile(models.Model):
    class Gender(models.TextChoices):
        MALE = 'male', 'Male'
        FEMALE = 'female', 'Female'
        OTHER = 'other', 'Other'

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    gender = models.TextField(
        max_length=20,
        choices=Gender.choices,
        default=Gender.MALE
    )
    institute = models.TextField(
        max_length=200
    )
    registration_date = models.DateField(auto_now_add=True)


class AccountVerification(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='account_verification')
    token = models.TextField(max_length=100)
    sent_at = models.DateTimeField(auto_now_add=True)
