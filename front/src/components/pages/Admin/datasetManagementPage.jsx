// src/pages/DatasetManagementPage.jsx
import React, { useState } from 'react';
import './datasetManagementPage.css';

const DatasetManagementPage = () => {
  const [datasets, setDatasets] = useState([
    { id: 1, name: 'Dataset 1', description: 'Description du dataset 1', file: 'file1.csv' },
    { id: 2, name: 'Dataset 2', description: 'Description du dataset 2', file: 'file2.csv' },
  ]);

  const [newDataset, setNewDataset] = useState({ name: '', description: '', file: '' });
  const [editingDataset, setEditingDataset] = useState(null); // Etat pour le dataset à modifier
  const [isModalOpen, setIsModalOpen] = useState(false); // Etat pour afficher/fermer le modal

  // Ajouter un dataset
  const handleAddDataset = () => {
    setDatasets([...datasets, { ...newDataset, id: datasets.length + 1 }]);
    setNewDataset({ name: '', description: '', file: '' });
    setIsModalOpen(false); // Fermer le modal après l'ajout
  };

  // Modifier un dataset
  const handleEditDataset = (dataset) => {
    setNewDataset({ name: dataset.name, description: dataset.description, file: dataset.file });
    setEditingDataset(dataset); // Définit le dataset à modifier
    setIsModalOpen(true); // Ouvre le modal
  };

  // Sauvegarder les modifications du dataset
  const handleSaveEditedDataset = () => {
    setDatasets(datasets.map(dataset =>
      dataset.id === editingDataset.id ? { ...dataset, ...newDataset } : dataset
    ));
    setNewDataset({ name: '', description: '', file: '' });
    setEditingDataset(null);
    setIsModalOpen(false); // Fermer le modal après la sauvegarde
  };

  // Supprimer un dataset
  const handleDeleteDataset = (id) => {
    setDatasets(datasets.filter(dataset => dataset.id !== id));
  };

  return (
    <div className="dataset-management-container">
      <h1>Gestion des Datasets</h1>
      <p>Bienvenue dans la section de gestion des datasets. Ici, vous pouvez ajouter, modifier et supprimer des datasets.</p>

      {/* Bouton d'ajout dataset qui ouvre le modal */}
      <button className="action-button" onClick={() => setIsModalOpen(true)}>
        Ajouter un dataset
      </button>

      {/* Modal d'ajout ou de modification dataset */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-container">
            <h2>{editingDataset ? 'Modifier un dataset' : 'Ajouter un dataset'}</h2>
            <input
              type="text"
              placeholder="Nom du dataset"
              value={newDataset.name}
              onChange={(e) => setNewDataset({ ...newDataset, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Description"
              value={newDataset.description}
              onChange={(e) => setNewDataset({ ...newDataset, description: e.target.value })}
            />
            <input
              type="text"
              placeholder="Fichier"
              value={newDataset.file}
              onChange={(e) => setNewDataset({ ...newDataset, file: e.target.value })}
            />
            <div className="modal-actions">
              <button className="action-button" onClick={editingDataset ? handleSaveEditedDataset : handleAddDataset}>
                {editingDataset ? 'Sauvegarder les modifications' : 'Ajouter'}
              </button>
              <button className="action-button" onClick={() => setIsModalOpen(false)}>
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tableau des datasets */}
      <table className="dataset-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Description</th>
            <th>Fichier</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {datasets.map(dataset => (
            <tr key={dataset.id}>
              <td>{dataset.id}</td>
              <td>{dataset.name}</td>
              <td>{dataset.description}</td>
              <td>{dataset.file}</td>
              <td>
                <button onClick={() => handleEditDataset(dataset)}>Modifier</button>
                <button onClick={() => handleDeleteDataset(dataset.id)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DatasetManagementPage;
