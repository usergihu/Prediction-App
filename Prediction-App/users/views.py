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
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
import logging


# Create your views here.

logger = logging.getLogger(__name__)
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
            return Response({'error': 'username and password are required.'}, status=status.HTTP_400_BAD_REQUEST)
       
        try:
          logger.debug(f"Authenticating user with email: {email}")
          user = authenticate(request, email=email, password=password)
          logger.debug(f"User returned from authenticate: {user}")

          if user is not None:
            refresh = RefreshToken.for_user(user)
            role = user.role
            if user.is_superuser or user.is_staff:
                role = 'admin'
            elif not user.is_superuser and not user.is_staff:
                 role = 'user'
            return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'user': {
                'email': user.email,
                'username': user.username,
                'role': role,
                'is_staff': user.is_staff,
                'is_superuser': user.is_superuser
            }
          },status=status.HTTP_200_OK)
          else:
                return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        

        except Exception as e:
          logger.error(f"Exception in login view: {str(e)}")
          return Response({'error': 'Internal server error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
class RegisterView(generics.CreateAPIView):
           queryset= CustomUser.objects.all()
           serializer_class=CustomUserSerializer
           permission_classes=[AllowAny] #to allow any person (anonymous user)

