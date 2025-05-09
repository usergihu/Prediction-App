// src/pages/UserManagementPage.jsx
import React, { useState } from 'react';
import './UserManagementPage.css';

const UserManagementPage = () => {
  const [users, setUsers] = useState([
     { id: 1, name: 'client1', email: 'client1@example.com', role: 'User' },
    { id: 1, name: 'NewUser', email: 'NewUser@example.com', role: 'User' },
    { id: 2, name: 'Usertest', email: 'Usertest@example.com', role: 'User' },
    { id: 2, name: 'admin6', email: 'admin6@example.com', role: 'Admin' },
  ]);

  const [newUser, setNewUser] = useState({ name: '', email: '', role: '' });
  const [editingUser, setEditingUser] = useState(null); // Etat pour l'utilisateur à modifier
  const [isModalOpen, setIsModalOpen] = useState(false); // Etat pour afficher/fermer le modal

  // Ajouter un utilisateur
  const handleAddUser = () => {
    setUsers([...users, { ...newUser, id: users.length + 1 }]);
    setNewUser({ name: '', email: '', role: '' });
    setIsModalOpen(false); // Fermer le modal après l'ajout
  };

  // Modifier un utilisateur
  const handleEditUser = (user) => {
    setNewUser({ name: user.name, email: user.email, role: user.role });
    setEditingUser(user); // Définit l'utilisateur à modifier
    setIsModalOpen(true); // Ouvre le modal
  };

  // Sauvegarder les modifications d'un utilisateur
  const handleSaveEditedUser = () => {
    setUsers(users.map(user =>
      user.id === editingUser.id ? { ...user, ...newUser } : user
    ));
    setNewUser({ name: '', email: '', role: '' });
    setEditingUser(null);
    setIsModalOpen(false); // Fermer le modal après la sauvegarde
  };

  // Supprimer un utilisateur
  const handleDeleteUser = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  return (
    <div className="user-management-container">
      <h1>Gestion des Utilisateurs</h1>
      <p>Bienvenue dans la section de gestion des utilisateurs. Ici, vous pouvez ajouter, modifier et supprimer des utilisateurs.</p>

      {/* Bouton d'ajout utilisateur qui ouvre le modal */}
      <button className="action-button" onClick={() => setIsModalOpen(true)}>
        Ajouter un utilisateur
      </button>

      {/* Modal d'ajout ou de modification utilisateur */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-container">
            <h2>{editingUser ? 'Modifier un utilisateur' : 'Ajouter un utilisateur'}</h2>
            <input
              type="text"
              placeholder="Nom"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            />
            <input
              type="email"
              placeholder="Email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            />
            <input
              type="text"
              placeholder="Rôle"
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            />
            <div className="modal-actions">
              <button className="action-button" onClick={editingUser ? handleSaveEditedUser : handleAddUser}>
                {editingUser ? 'Sauvegarder les modifications' : 'Ajouter'}
              </button>
              <button className="action-button" onClick={() => setIsModalOpen(false)}>
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tableau des utilisateurs */}
      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Email</th>
            <th>Rôle</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button onClick={() => handleEditUser(user)}>Modifier</button>
                <button onClick={() => handleDeleteUser(user.id)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagementPage;
