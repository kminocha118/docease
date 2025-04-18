import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import UploadForm from './components/UploadForm';
import SearchPage from './components/SearchPage';
import Navbar from './components/Navbar';
import './App.css';
import Login from "./components/Login";
import Footer from "./components/Footer";
import { useEffect, useState } from 'react';
import OffroleUploadForm from './components/OffroleUploadForm';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    const checkAuth = () => {
      setIsAuthenticated(!!localStorage.getItem("token"));
    };

    window.addEventListener("storage", checkAuth); // Listen for token changes

    return () => {
      window.removeEventListener("storage", checkAuth);
    };
  }, []);

  return (
    <Router>
      <div className="App">
        {isAuthenticated && <Navbar />}
        <Routes>
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/" element={<Navigate to="/login" />} />
          
          <Route path="/upload" element={<PrivateRoute><UploadForm /></PrivateRoute>} />
          <Route path="/offrole" element={<OffroleUploadForm />} />
          <Route path="/search" element={<PrivateRoute><SearchPage /></PrivateRoute>} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;



