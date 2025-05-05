import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // ➕ Import nécessaire
import './login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === '' || password === '') {
      setError('Veuillez remplir tous les champs.');
    } else {
      setError('');
      console.log('Logging in with:', { email, password });
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
        <button type="submit"><Link className="lien" to="/predict">Connexion</Link></button>
      </form>

      {/* ➕ Lien vers la page d'inscription */}
      <p className="switch-auth">
        Pas encore inscrit ? <Link className='lien2' to="/register">Créez un compte</Link>
      </p>
    </div>
  );
};

export default Login;
