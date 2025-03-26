import React, { useState } from 'react';
import axios from 'axios';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/default-layout/lib/styles/index.css'; // Ensure styles are applied

const SearchPage = () => {
  const [empId, setEmpId] = useState('');
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  // Initialize PDF Viewer Plugin
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/search/${empId}/`);
      setFiles(response.data.files || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };



  const handleCloseModal = () => {
    setSelectedFile(null);
  };

  const handleDownload = (fileUrl) => {
    const absoluteUrl = `http://localhost:8000${fileUrl}`;
    const link = document.createElement('a');
    link.href = absoluteUrl;
    link.setAttribute('download', fileUrl.split('/').pop());
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="search-page">
      <h2 style={{ color: "black" }}>Search Files by Employee ID</h2>

      <input
        type="text"
        placeholder="Enter Employee ID"
        value={empId}
        onChange={(e) => setEmpId(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      <div className="file-list">
        {files.map((file, index) => {
          const fileName = file.split('/').pop();
          //const fileExtension = fileName.split('.').pop().toLowerCase();

          return (
            <div key={index} className="file-item">
              <p>{fileName}</p>
              
              <button onClick={() => handleDownload(file)}>Download</button>
            </div>
          );
        })}
      </div>

      {/* Modal for Viewing Files */}
      {selectedFile && (
        <div className="modal">
          <button onClick={handleCloseModal} className="close-button">Close</button>

          {/* PDF Viewer */}
          {selectedFile.endsWith('.pdf') ? (
            <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.0.279/build/pdf.worker.min.js`}>
              <Viewer fileUrl={selectedFile} plugins={[defaultLayoutPluginInstance]} />
            </Worker>
          ) : (
            <iframe src={selectedFile} title="File Preview" width="100%" height="500px" />
          )}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
