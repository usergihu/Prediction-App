from django.shortcuts import render
from django.contrib.auth import get_user_model
from django.http import JsonResponse
from rest_framework.decorators  import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import CustomUserSerializer
from .models import CustomUser
from rest_framework import generics
from rest_framework.permissions import AllowAny
from django.contrib.auth import authenticate as auth_authenticate
from rest_framework_simplejwt.tokens import RefreshToken

# Create your views here.
@api_view(['POST'])
def register(request):
   if request.method =='POST':
    serializer=CustomUserSerializer(data=request.data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data,status=status.HTTP_201_CREATED)
    return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
@api_view(['POST'])
def login(request):
  #check if the user is registered
        email=request.data.get('email')
        password=request.data.get('password')
        if not email or not password :
            return Response({'error': 'Email and password are required.'}, status=status.HTTP_400_BAD_REQUEST)
        def authenticate(request, email=None, password=None):
          if email is not None and password is not None:
            try:
              user = CustomUser.objects.get(email=email)  # Find user by email
              if user.check_password(password):
                return user
            except CustomUser.DoesNotExist:
             return None
        return None
        user= authenticate(request,email=email,password=password)
        if user is not None:
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'user': {
                'email': user.email,
                'username': user.username,
                'is_staff': user.is_staff,
                'is_superuser': user.is_superuser
            }})
        else:
          return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
class RegisterView(generics.CreateAPIView):
           queryset= CustomUser.objects.all()
           serializer_class=CustomUserSerializer
           permission_classes=[AllowAny] #to allow any person (anonymous user)

def get(self, request, *args, **kwargs):
        return Response({"detail": "Method Not Allowed"}, status=status.HTTP_405_METHOD_NOT_ALLOWED)