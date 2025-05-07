import React, { useState } from 'react';
import './PredictionPage.css';

export default function UserDashboard() {
  const [file, setFile] = useState(null);
  const [classicResult, setClassicResult] = useState(null);
  const [quantumResult, setQuantumResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (url, setResult) => {
    if (!file) return alert("Veuillez choisir un fichier .py");
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(url, {
        method: "POST",
        body: formData,
      });
      console.log(res.status);
      const data = await res.json();
      setResult(data);
      alert("✅ Prédiction effectuée avec succès !");
    } catch (err) {
      setResult({ error: "Erreur lors de l'envoi à l'API." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-container">
      <h1>Prédiction à partir d'un Fichier Python</h1>

      <div className="upload-section">
        <input
          type="file"
          accept=".py"
          id="fileInput"
          onChange={(e) => setFile(e.target.files[0])}
        />
      </div>

      <div className="button-group">

        <span className='button1'> <button onClick={() => handleSubmit("http://localhost:8000/api/predictor/classic/", setClassicResult)} disabled={loading}>
          Classique
        </button> </span>
        <span className='button2'> <button onClick={() => handleSubmit("http://localhost:8000/api/predictor/quantum/", setQuantumResult)} disabled={loading}>
          Quantique
        </button></span>
      </div>

      <div className="results-section">
        <div className="result-box">
          <h3>Résultat Classique</h3>
          <pre>{classicResult && JSON.stringify(classicResult, null, 2)}</pre>
        </div>

        <div className="result-box">
          <h3>Résultat Quantique</h3>
          <pre>{quantumResult && JSON.stringify(quantumResult, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
}