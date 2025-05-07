from django.shortcuts import render
from django.contrib.auth.decorators import user_passes_test
def admin_required(view_func):
    return user_passes_test(lambda u: u.is_authenticated and u.is_staff)(view_func)

@admin_required
def manage_users(request):
    return render(request, 'admin/datasetManagementPage.jsx')

@admin_required
def manage_datasets(request):
    return render(request, 'admin/manage_datasets.html')

@admin_required
def model_evaluation(request):
    return render(request, 'admin/model_evaluation.html')
@admin_required
def run_analysis(request):
    return render(request, 'dashboard/run_analysis.html')

@admin_required
def view_results(request):
    return render(request, 'dashboard/view_results.html')

