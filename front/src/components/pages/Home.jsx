import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="home-content">
        <h1>
          <div>Bienvenue sur </div><div className="highlight">Maintainability App</div>
        </h1>
        <p>
          <div>Prédisez la maintenabilité de votre code grâce à l’IA.</div> 
          <div> Obtenez des insights instantanés
          et améliorez vos projets logiciels avec précision et confiance.</div>
        </p>
        <div className="button-group">
          <button className="home-button" onClick={() => navigate('/login')}>
            Se connecter
          </button>
          <button className="home-button secondary" onClick={() => navigate('/register')}>
            S’inscrire
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
