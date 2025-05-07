from django.contrib.auth.backends import ModelBackend
from django.contrib.auth import get_user_model

class EmailBackend(ModelBackend):
    def authenticate(self, request, email=None, password=None, **kwargs):
        print("EmailBackend used. Email:", email)
        UserModel = get_user_model()
        try:
            user = UserModel.objects.get(email=email)
            print("Found user:", user)
            if user.check_password(password):
                print(" Password is correct!")
                return user
            else:
                print(" Wrong password")
        except UserModel.DoesNotExist:
             print(" No user with that email")
        return None
