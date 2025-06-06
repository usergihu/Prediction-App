# Generated by Django 5.2 on 2025-05-03 14:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='customuser',
            options={'permissions': [('can_manage_users', 'Can update and delete users'), ('can_manage_datasets', 'Can manage datasets'), ('can_validate_models', 'Can validate models')]},
        ),
        migrations.AddField(
            model_name='customuser',
            name='role',
            field=models.CharField(choices=[('admin', 'Admin'), ('user', 'User')], default='user', max_length=10),
        ),
        migrations.AlterField(
            model_name='customuser',
            name='username',
            field=models.CharField(max_length=1000, unique=True),
        ),
    ]
