from django.contrib.auth.decorators import user_passes_test

def admin_required(view_func):
    decorated_view_func = user_passes_test(lambda u: u.is_authenticated and u.role == 'admin')(view_func)
    return decorated_view_func

def user_required(view_func):
    decorated_view_func = user_passes_test(lambda u: u.is_authenticated and u.role == 'user')(view_func)
    return decorated_view_func