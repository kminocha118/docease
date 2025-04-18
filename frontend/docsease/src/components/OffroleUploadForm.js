import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './UploadForm.css'; // You can reuse the same styling

const OffroleUploadForm = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [empId, setEmpId] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
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
      const response = await axios.post(
        'http://localhost:8000/api/upload/offrole/', // 🔁 Off-role endpoint
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.status === 201) {
        setMessage(response.data.message);
      } else {
        setMessage('Failed to upload file.');
      }
    } catch (error) {
      console.error('Upload error:', error);
      setMessage('Failed to upload file.');
    }
  };

  return (
    <div className="upload-form">
      <h1>Upload Off-role Employee Documents</h1>
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

      <div className="navigate-search">
        <Link to="/search">
          <button className="search-button">Go to Search Page</button>
        </Link>
      </div>
    </div>
  );
};

export default OffroleUploadForm;
