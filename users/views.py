from django.shortcuts import render
from django.contrib.auth import get_user_model
from django.http import JsonResponse
from rest_framework.decorators  import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import CustomUserSerializer


# Create your views here.
@api_view(['POST'])
def register(request):
   if request.methode ==' POST':
    serializer=CustomUserSerializer(data=request.data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data,status=status.HTTP_201_CREATED)
    return Response(serializer.data,status=status.HTTP_404_BAD_REQUEST)
@api_view(['post'])
def login(request):
  #check if the user is registered
        email=request.data.get('email')
        password=request.data.get('password')
        if not email or not password :
            return Response({'error': 'Email and password are required.'}, status=status.HTTP_400_BAD_REQUEST)
        user= authentificate(request,email=email,passwor=password)
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