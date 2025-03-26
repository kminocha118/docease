import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import UploadForm from './components/UploadForm';
import SearchPage from './components/SearchPage';
import Navbar from './components/Navbar';
import './App.css';
import Login from "./components/Login";
import Footer from "./components/Footer";


const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <div className="App">
      <Navbar />
        <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/login" />} />

          
          <Route path="/upload" element={<PrivateRoute><UploadForm /></PrivateRoute>} />

          <Route path="/search" element={<PrivateRoute><SearchPage /></PrivateRoute>} />
          </Routes>
          <Footer />
        
      </div>
    </Router>
  );
}

export default App;


