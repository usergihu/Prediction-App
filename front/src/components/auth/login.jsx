import React, { useState } from 'react';
import { Link } from 'react-router-dom'; //  Import nécessaire
import './login.css';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();

    if (email === '' || password === '') {
      setError('Veuillez remplir tous les champs.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/users/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }), // adjust if your field is 'username'
      });

      const data = await response.json();

      if (response.ok) {
        // store the tokens
        localStorage.setItem('access', data.access);
        localStorage.setItem('refresh', data.refresh);
        console.log(' Authentifié avec succès', data);
        const userRole = data.user?.role;
        console.log('✅ Connecté avec rôle :', userRole);

        if (userRole === 'admin') {
          navigate('/AdminDashboard');
        } else if (userRole === 'user') {
          navigate('/predict');
        } else {
          setError('Rôle utilisateur non reconnu.');
        }
      } else {
        setError(data.detail || 'Erreur lors de la connexion.');
      }
    } catch (err) {
      console.error(err);
      setError('Erreur de connexion au serveur.');
    }
  };

  return (
    <div className="login-container">
      <h2>Se connecter</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Adresse email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="error">{error}</p>}
        <button type="submit">Connexion</button>
        </form>

      {/* ➕ Lien vers la page d'inscription */}
      <p className="switch-auth">
        Pas encore inscrit ? <Link className='lien2' to="/register">Créez un compte</Link>
      </p>
    </div>
  );
};

export default Login;
