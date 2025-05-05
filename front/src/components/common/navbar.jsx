import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-title">Maintainability App</Link>
      </div>
      <div className="navbar-right">
  <Link to="/">Accueil</Link>
  <Link to="/login">Connexion</Link>
  <Link to="/register">Inscription</Link>
  <Link to="/user-management">Gestion des utilisateurs</Link>
  <Link to="/dataset-management">Gestion des datasets</Link>
</div>

    </div>
  );
};

export default Navbar;
