from django.contrib import admin
from django.utils.translation import gettext_lazy as _

from .models import User, Profile, AccountVerification


class ProfileInline(admin.StackedInline):
    model = Profile
    can_delete = False
    verbose_name_plural = 'Profile'
    fk_name = 'user'


class UserAdmin(admin.ModelAdmin):
    inlines = [ProfileInline, ]
    list_display = ('email', 'first_name', 'last_name', 'get_gender', 'is_active', 'is_verified')
    list_filter = ('is_verified', 'is_active', 'profile__gender')
    search_fields = ('email', 'first_name', 'last_name', 'profile__gender', 'profile__institute')

    def get_gender(self, obj):
        return obj.profile.gender.capitalize()

    get_gender.short_description = 'Gender'


admin.site.register(User, UserAdmin)
