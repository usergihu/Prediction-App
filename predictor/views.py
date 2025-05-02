import os
import pickle
import numpy as np
import pandas as pd
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser
import ast
import re
import math

# Charger le modèle
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODEL_PATH = os.path.join(BASE_DIR, 'predictor', 'ml_models', 'classical', 'normCLASSIC.pkl')
CSV_PATH = os.path.join(BASE_DIR, 'predictor', 'ml_models', 'classical', 'all_data (1).csv')

# Charger noms de colonnes depuis le CSV d’origine
df_example = pd.read_csv(CSV_PATH)
FEATURE_COLUMNS = df_example.drop(columns=['Unnamed: 0', 'defects']).columns.tolist()


with open(MODEL_PATH, "rb") as f:
    model = pickle.load(f)

def extract_features_from_code(code_str):
    try:
        # --- Extraction des métriques ---
        tree = ast.parse(code_str)
        operands = [node.id for node in ast.walk(tree) if isinstance(node, ast.Name)]
        operators = re.findall(r'[+\-*/%=<>!&|]+|\breturn\b|\bif\b|\belse\b|\bwhile\b|\bfor\b', code_str)

        n1 = len(set(operators))
        n2 = len(set(operands))
        N1 = len(operators)
        N2 = len(operands)

        n = n1 + n2
        N = N1 + N2

        if n == 0 or n2 == 0:
            raise ValueError("Code trop petit ou invalide pour les métriques Halstead.")

        volume = N * math.log2(n)
        difficulty = (n1 / 2) * (N2 / n2)
        intelligence = volume / difficulty if difficulty != 0 else 0
        effort = difficulty * volume
        bugs = volume / 3000
        time = effort / 18

        loc = len(code_str.strip().splitlines())
        lloc = loc
        comments = 0
        blanks = 0
        comment_and_code = lloc + comments
        branch_count = code_str.count("if") + code_str.count("for") + code_str.count("while")

        vg = branch_count + 1
        evg = vg
        ivg = vg

        features = np.array([[loc, vg, evg, ivg, n, volume,
                              N, difficulty, intelligence, effort, bugs, time,
                              lloc, comments, blanks, comment_and_code,
                              n1, n2, N1, N2, branch_count]])

        print("Extracted features (before normalization):", features)

        # --- Normalisation Min-Max manuelle par colonne ---
        df_all = df_example.drop(columns=['defects'])  # pour accéder aux min/max
        normalized = []
        for i, col in enumerate(FEATURE_COLUMNS):
            min_val = df_all[col].min()
            max_val = df_all[col].max()
            val = features[0][i]
            if max_val == min_val:
                normalized.append(0.0)
            else:
                normalized.append(round((val - min_val) / (max_val - min_val), 6))

        features_df = pd.DataFrame([normalized], columns=FEATURE_COLUMNS)
        print("Normalized features:", features_df.values)

        return features_df

    except Exception as e:
        raise ValueError(f"Échec de l'extraction des caractéristiques : {str(e)}")

class PredictView(APIView):
    parser_classes = [MultiPartParser]

    def post(self, request):
        file = request.FILES.get('file', None)
        if file is None:
            return Response({"error": "No file provided"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            code_str = file.read().decode('utf-8')
            features_df = extract_features_from_code(code_str)
            prediction = model.predict(features_df)[0]
            result = "✅ Clean" if prediction == 0 else "❌ Defective"

            return Response({
                "prediction": result,
                "features_used": features_df.values[0].tolist()
            }, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class ClassicPredictView(APIView):
    def post(self, request):
        return Response({"result": "Classic model prediction"})

class QuantumPredictView(APIView):
    def post(self, request):
        return Response({"result": "Quantum model prediction"})
