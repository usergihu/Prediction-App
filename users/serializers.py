from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import CustomUser
User=get_user_model()
class RegisterSerializers(serializers.ModelSerializer):
    password=serializers.CharField(write_only=True,min_length=6)
    class Meta:
        model = User
        fields = ['email', 'username', 'password','is_staff']

    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data['email'],
            username=validated_data['username'],
            password=validated_data['password']
        )
        return user
class CustomUserSerializer(serializers.ModelSerializer):
    password =serializers.CharField(write_only=True)
    class Meta :
        model=CustomUser
        fields=('id','username','email','password')
        def create(self,validated_data):
            user=CustomUser.objects.create_user(
                username=validated_data['username'],
                email=validated_data['email'],
                password=validated_data['password'],
            )
            return user
        