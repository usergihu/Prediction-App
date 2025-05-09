import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './login.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();

    if (!username || !email || !password || !confirmPassword) {
      setError("Tous les champs sont requis.");
    } else if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
    } else {
      setError('');
      fetch('http://localhost:8000/api/users/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
        }),
      })
        .then(response => {
          if (!response.ok) {
            return response.json().then(data => {
              throw new Error(
                typeof data === 'object' ? Object.values(data).flat().join(', ') : 'Registration failed'
              );
            });
          }
          return response.json();
        })
        .then(data => {
          console.log("Utilisateur inscrit avec succès:", data);
          alert("Inscription réussie !");
        })
        .catch(error => {
          setError(error.message);
        });
    }
  };

  return (
    <div className="login-container">
      <h2>Créer un compte</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Adresse email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirmer le mot de passe"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {error && <p className="error">{error}</p>}
        <button type="submit">S'inscrire</button>
      </form>

      <p className="switch-auth">
        Déjà inscrit ? <Link className='lien2' to="/login">Connectez-vous</Link>
      </p>
    </div>
  );
};

export default Register;
