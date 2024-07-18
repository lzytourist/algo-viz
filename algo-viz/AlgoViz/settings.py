"""
Django settings for AlgoViz project.

Generated by 'django-admin startproject' using Django 5.0.6.

For more information on this file, see
https://docs.djangoproject.com/en/5.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/5.0/ref/settings/
"""
import os
from pathlib import Path
from dotenv import dotenv_values

from django.contrib import staticfiles

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

ENV = dotenv_values(".env")

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-1zfzkmli6#!=t&+y&l1in1d1@!3xd9ejcgtg32^ooq34zd-9l4'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

AUTH_USER_MODEL = 'Account.User'

ALLOWED_HOSTS = []

CORS_ALLOW_CREDENTIALS = True
CORS_ALLOWED_ORIGINS = [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
]

# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    'rest_framework',
    'rest_framework.authtoken',
    'djoser',
    'corsheaders',
    'tinymce',
    'django_filters',

    # apps
    'Account',
    # 'Training',
    'Algorithm',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'AlgoViz.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': ['templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'AlgoViz.wsgi.application'

# Database
# https://docs.djangoproject.com/en/5.0/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'HOST': ENV.get('POSTGRES_HOST'),
        'NAME': ENV.get('POSTGRES_DATABASE'),
        'USER': ENV.get('POSTGRES_USER'),
        'PASSWORD': ENV.get('POSTGRES_PASSWORD'),
        'OPTIONS': {
            'client_encoding': 'utf8mb4',
        }
    }
}

# Password validation
# https://docs.djangoproject.com/en/5.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Internationalization
# https://docs.djangoproject.com/en/5.0/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'Asia/Dhaka'

USE_I18N = True

USE_TZ = True

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.0/howto/static-files/

STATIC_URL = 'static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'static')

# STATICFILES_DIRS = [
#     os.path.join(BASE_DIR, 'static'),
# ]

# Default primary key field type
# https://docs.djangoproject.com/en/5.0/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# Email
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = ENV.get('EMAIL_HOST')
EMAIL_HOST_USER = ENV.get('EMAIL_HOST_USER')
EMAIL_HOST_PASSWORD = ENV.get('EMAIL_HOST_PASSWORD')
EMAIL_PORT = ENV.get('EMAIL_PORT')
EMAIL_USE_TLS = True
EMAIL_USE_SSL = False

DEFAULT_FROM_EMAIL = f'AlgoViz <{EMAIL_HOST_USER}>'

EMAIL_VERIFICATION_MAIL_DELAY = 5  # Minutes

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        # 'rest_framework.authentication.TokenAuthentication',
        'Account.authentication.CustomTokenAuthentication',
    ),
    'DEFAULT_FILTER_BACKENDS': (
        'django_filters.rest_framework.DjangoFilterBackend',
        'rest_framework.filters.SearchFilter',
        'rest_framework.filters.OrderingFilter',
    ),
    'DEFAULT_PAGINATION_CLASS': 'AlgoViz.utils.Pagination',
}

DJOSER = {
    'PASSWORD_RESET_CONFIRM_URL': 'password-reset/{uid}/{token}',
    'SEND_ACTIVATION_EMAIL': True,
    'ACTIVATION_URL': 'activation/{uid}/{token}',
    'USER_CREATE_PASSWORD_RETYPE': True,
    'PASSWORD_RESET_CONFIRM_RETYPE': True,
    'SERIALIZERS': {
        'user': 'Account.serializers.CustomUserSerializer',
        'current_user': 'Account.serializers.CustomUserSerializer',
    },
    'EMAIL': {
        'activation': 'Account.email.AccountActivationEmail',
    }
}

TINYMCE_DEFAULT_CONFIG = {
    "theme": "silver",
    "height": 500,
    "menubar": True,
    "plugins": "advlist,autolink,lists,link,image,charmap,print,preview,anchor,"
               "searchreplace,visualblocks,code,fullscreen,insertdatetime,media,table,paste,"
               "code,help,wordcount",
    "toolbar": "undo redo | formatselect | "
               "bold italic backcolor | alignleft aligncenter "
               "alignright alignjustify | bullist numlist outdent indent | "
               "removeformat | help",
}

AUTH_COOKIE = 'token'
AUTH_COOKIE_MAX_AGE = 60 * 60 * 24
AUTH_COOKIE_SECURE = False
AUTH_COOKIE_HTTPONLY = True
AUTH_COOKIE_SAMESITE = None
AUTH_COOKIE_PATH = '/'

EMAIL_FRONTEND_PROTOCOL = ENV.get('EMAIL_FRONTEND_PROTOCOL')
EMAIL_FRONTEND_DOMAIN = ENV.get('EMAIL_FRONTEND_DOMAIN')
EMAIL_FRONTEND_SITE_NAME = ENV.get('EMAIL_FRONTEND_SITE_NAME')
# SITE_NAME = EMAIL_FRONTEND_SITE_NAME
# DOMAIN = EMAIL_FRONTEND_DOMAIN
