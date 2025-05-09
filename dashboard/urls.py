from django.urls import path
from .views import (
    manage_users, manage_datasets, model_evaluation,
    run_analysis, view_results
)

urlpatterns = [
    path('admin/users/', manage_users, name='manage_users'),
    path('admin/datasets/', manage_datasets, name='manage_datasets'),
    path('admin/models/', model_evaluation, name='model_evaluation'),

    path('dashboard/analyze/', run_analysis, name='run_analysis'),
    path('dashboard/results/', view_results, name='view_results'),
]
