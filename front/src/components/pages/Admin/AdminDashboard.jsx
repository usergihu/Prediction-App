import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css'; // Assuming the CSS file is named this

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleNavigation = (page) => {
    switch (page) {
      case 'predict':
        navigate('/predict');
        break;
      case 'manageUsers':
        navigate('/user-management');
        break;
      case 'manageDatasets':
        navigate('/dataset-management');
        break;
      default:
        break;
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="home-content">
        <h1>Welcome, Admin</h1>
        <p>Choose an option to manage:</p>
        <div className="button-group">
          <button
            className="home-button"
            onClick={() => handleNavigation('predict')}
          >
            Predict
          </button>
          <button
            className="home-button"
            onClick={() => handleNavigation('manageUsers')}
          >
            Manage Users
          </button>
          <button
            className="home-button"
            onClick={() => handleNavigation('manageDatasets')}
          >
            Manage Datasets
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
