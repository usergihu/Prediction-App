from django.urls import path
from .views import PredictView, ClassicPredictView, QuantumPredictView

urlpatterns = [
    # Endpoint pour l'upload d’un fichier Python
    path('', PredictView.as_view(), name='file-predict'),

    # Endpoint pour prédiction avec 22 features en JSON
    path('classic/', ClassicPredictView.as_view(), name='classic-predict'),
    path('quantum/', QuantumPredictView.as_view(), name='quantum-predict'),
]
