import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './UploadForm.css';


    

const UploadForm = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [empId, setEmpId] = useState('');
  const [message, setMessage] = useState('');
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); // Redirect to login if not authenticated
    }
  }, [navigate]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleEmpIdChange = (e) => {
    setEmpId(e.target.value);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !empId) {
      setMessage('Please select a file and enter Employee ID.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('emp_id', empId);

    try {
      const response = await axios.post('http://localhost:8000/api/upload/', formData,{ headers: {
        'Content-Type': 'multipart/form-data',
      }
    });

    console.log('Response:', response); // Check the response here
    if (response.status === 201) {
      setMessage(response.data.message);
    } else {
      setMessage('Failed to upload file');
    }
    } catch (error) {
      console.error('Upload error:', error);
    setMessage('Failed to upload file');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove authentication token
    navigate("/login"); // Redirect to login page
  };


  return (
    <div className="upload-form">
      <h1>Upload Employee Documents</h1>
      <form onSubmit={handleUpload}>
        <input
          type="text"
          placeholder="Employee ID"
          value={empId}
          onChange={handleEmpIdChange}
        />
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      {message && <p>{message}</p>}

      {/* Navigation Link to Search Page */}
      <div className="navigate-search">
        <Link to="/search">
          <button className="search-button">Go to Search Page</button>
        </Link>
      </div>
      <button className="logout-button" onClick={handleLogout}>
  Logout
</button>

    </div>
  );
};

export default UploadForm;
