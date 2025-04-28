import React, { useState } from 'react';
import axios from 'axios';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { motion, AnimatePresence } from 'framer-motion';
import './SearchPage.css';

const SearchPage = () => {
  const [empId, setEmpId] = useState('');
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showDialog, setShowDialog] = useState(false);

  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/search/${empId}/`);
      setFiles(response.data.files || []);
      setShowDialog(false); // Close dialog after successful fetch
    } catch (error) {
      console.error('Error fetching data:', error);
    }
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
      <h2>Search Files by Employee ID</h2>

      <motion.input
        type="text"
        placeholder="Enter Employee ID"
        value={empId}
        onChange={(e) => setEmpId(e.target.value)}
        whileFocus={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      />

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowDialog(true)}
      >
        Search
      </motion.button>

      <AnimatePresence>
        {showDialog && (
          <motion.div className="dialog-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div className="dialog-box"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <p>Would you like to securely proceed with fetching the employee’s information?</p>
              <div className="dialog-buttons">
                <button className="confirm" onClick={handleSearch}>Yes</button>
                <button className="cancel" onClick={() => setShowDialog(false)}>Cancel</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="file-list">
        {files.map((file, index) => {
          const fileName = file.split('/').pop();
          return (
            <motion.div
              className="file-item"
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <p>{fileName}</p>
              <button onClick={() => handleDownload(file)}>Download</button>
            </motion.div>
          );
        })}
      </div>

      {selectedFile && (
        <div className="modal">
          <button onClick={() => setSelectedFile(null)} className="close-button">Close</button>
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
