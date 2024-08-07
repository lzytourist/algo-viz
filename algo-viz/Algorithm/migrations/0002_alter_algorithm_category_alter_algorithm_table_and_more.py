# Generated by Django 5.0.6 on 2024-06-20 13:13

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Algorithm', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='algorithm',
            name='category',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='algorithm_algorithms', to='Algorithm.algorithmcategory'),
        ),
        migrations.AlterModelTable(
            name='algorithm',
            table='algorithm_algorithms',
        ),
        migrations.AlterModelTable(
            name='algorithmcategory',
            table='algorithm_category',
        ),
        migrations.AlterModelTable(
            name='comment',
            table='algorithm_comments',
        ),
        migrations.AlterModelTable(
            name='userprogress',
            table='algorithm_user_progress',
        ),
    ]
