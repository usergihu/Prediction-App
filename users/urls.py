from django.urls import path
from .views import RegisterView
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns=[
    path('register/',RegisterView.as_view(),name='register'),
    path('login/',views.login,name='login'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
   
]

