from django.db import models
from django.contrib.auth.models import User


class Profile(models.Model):
    class Gender(models.TextChoices):
        MALE = 'male', 'Male'
        FEMALE = 'female', 'Female'
        OTHER = 'other', 'Other'

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    gender = models.TextField(
        max_length=20,
        choices=Gender.choices
    )
    institute = models.TextField(
        max_length=200
    )
    registration_date = models.DateField(auto_now_add=True)
