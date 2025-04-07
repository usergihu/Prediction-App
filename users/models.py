from django.db import models
from django.contrib.auth.models import AbstractBaseUser,BaseUserManager,PermissionsMixin

# Create your models here.
class CustomUserManager(BaseUserManager):
    def create_user(self,email,username,password=None):
        if not email:
            raise ValueError("the Emailmust be set")
        email=self.normalize_email(email)
        user=self.model(email=email,username=username)
        user.set_password(password)
        user.save(using=self.db)
        return user
    def create_superuser(self,email,username,password=None):
        extra_fields.setdefault('is_staff',True)
        extra_fields.setdefault('is_superuser',False)
        return self.create_user(email,username,password)
class CustomUser(AbstractBaseUser,PermissionsMixin):
    email=models.EmailField(unique=True)
    username=models.CharField(max_length=30,unique=True)
    is_active=models.BooleanField(default=True)
    is_staff=models.BooleanField(default=False)
    is_superuser=models.BooleanField(default=False)
    date_joined=models.DateTimeField(auto_now_add=True)

    objects=CustomUserManager()
    USERNAME_FIELD ='email'
    REQUIRED_FIELDS = ['Username','password']

    def __str__(self):
        return self.username
        

    


    


