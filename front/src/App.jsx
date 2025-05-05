import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/common/navbar';
import Login from './components/auth/login';
import Register from './components/auth/register';
import PredictionPage from './components/pages/PredictionPage';
import Home from './components/pages/Home';
import UserManagementPage from './components/pages/Admin/UserManagementPage'; // Importer la page de gestion des utilisateurs
import DatasetManagementPage from './components/pages/Admin/datasetManagementPage'; // Importer la page de gestion des datasets

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/predict" element={<PredictionPage />} />
        <Route path="/user-management" element={<UserManagementPage />} /> {/* Page gestion utilisateurs */}
        <Route path="/dataset-management" element={<DatasetManagementPage />} /> {/* Page gestion datasets */}
      </Routes>
    </Router>
  );
}

export default App;
