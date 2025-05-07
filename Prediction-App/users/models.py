from django.db import models
from django.contrib.auth.models import AbstractBaseUser,BaseUserManager,PermissionsMixin
from django.conf import settings
# Create your models here.
class CustomUserManager(BaseUserManager):
    def create_user(self,email,username,password=None,**extra_fields):
        if not email:
            raise ValueError("the Email must be set")
        email=self.normalize_email(email)
        user=self.model(email=email,username=username,**extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user
    def create_superuser(self,email,username,password=None,**extra_fields):
        extra_fields.setdefault('is_staff',True)
        extra_fields.setdefault('is_superuser',True)
        return self.create_user(email,username,password,**extra_fields)
class CustomUser(AbstractBaseUser,PermissionsMixin):
    
    email=models.EmailField(unique=True)
    username=models.CharField(max_length=1000,unique=True)
    ROLE_CHOICES = (
        ('admin', 'Admin'),
        ('user', 'User'),
    )
    role = models.CharField(max_length=10, choices=[('admin', 'Admin'), ('user', 'User')], default='user')
    is_active=models.BooleanField(default=True)
    is_staff=models.BooleanField(default=False)
    is_superuser=models.BooleanField(default=False)
    date_joined=models.DateTimeField(auto_now_add=True)

    objects=CustomUserManager()
    USERNAME_FIELD ='email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.username
    class Meta:
            permissions = [
            ("can_manage_users", "Can update and delete users"),
            ("can_manage_datasets", "Can manage datasets"),
            ("can_validate_models", "Can validate models"),
        ]
    
class Analysis(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    # Placeholder fields if needed
    method = models.CharField(max_length=50, choices=[('classical', 'Classical'), ('quantum', 'Quantum')])

    class Meta:
        permissions = [
            ("run_classical", "Can run classical analysis"),
            ("run_quantum", "Can run quantum analysis"),
            ("view_results", "Can view analysis results"),
           
        ]

    


