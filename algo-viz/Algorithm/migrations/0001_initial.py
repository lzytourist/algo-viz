# Generated by Django 5.0.6 on 2024-06-20 13:11

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='AlgorithmCategory',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('slug', models.SlugField(max_length=100, unique=True)),
                ('parent', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='children', to='Algorithm.algorithmcategory')),
            ],
        ),
        migrations.CreateModel(
            name='Algorithm',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('description', models.TextField()),
                ('slug', models.SlugField(max_length=255, unique=True)),
                ('component', models.CharField(max_length=20)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='algorithms', to='Algorithm.algorithmcategory')),
            ],
            options={
                'db_table': 'algorithms',
            },
        ),
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.TextField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('algorithm', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='comments', to='Algorithm.algorithm')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='comments', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': 'comments',
            },
        ),
        migrations.CreateModel(
            name='UserProgress',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('algorithm', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user_progress', to='Algorithm.algorithm')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user_progress', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': 'user_progress',
                'unique_together': {('user', 'algorithm')},
            },
        ),
    ]
