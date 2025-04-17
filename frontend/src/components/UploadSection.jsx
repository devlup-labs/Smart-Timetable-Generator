import React, { useState } from 'react';
import axios from 'axios';

function UploadSection() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [slots, setSlots] = useState([]);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setMessage('');
      setError('');
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
      setMessage('');
      setError('');
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const processDocument = async () => {
    if (!file) {
      setError('Please select a file first');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    
    setLoading(true);
    setError('');
    setMessage('');
    
    try {
      // Upload the image
      const uploadResponse = await axios.post('http://localhost:8000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      setMessage(uploadResponse.data.message);
      
      // Get extracted subjects and slots
      const extractionResponse = await axios.get('http://localhost:8000/get_subjects_slots');
      setSubjects(extractionResponse.data.subjects);
      setSlots(extractionResponse.data.slots);
      
    } catch (err) {
      setError(err.response?.data?.detail || 'An error occurred during processing');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="upload-section" className="upload-container">
      <h2>Upload Your Course Registration</h2>
      <p>Upload a clear image of your course registration document</p>
      
      <div 
        className="upload-area" 
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => document.getElementById('file-input').click()}
      >
        <input 
          id="file-input" 
          type="file" 
          accept=".jpg,.jpeg,.png" 
          onChange={handleFileChange} 
          style={{ display: 'none' }}
        />
        <div className="upload-icon">📄</div>
        {file ? (
          <p>Selected file: {file.name}</p>
        ) : (
          <>
            <p>Drop your file here or click to browse</p>
            <p><small>Supported formats: JPG, PNG, JPEG</small></p>
          </>
        )}
      </div>
      
      {error && <div className="error-message">{error}</div>}
      {message && <div className="success-message">{message}</div>}
      
      <button 
        className="btn btn-primary" 
        onClick={processDocument}
        disabled={loading || !file}
      >
        {loading ? 'Processing...' : 'Process Document'}
      </button>
      
      {subjects.length > 0 && (
        <div className="results-container">
          <h3>Extracted Information</h3>
          <div className="results-grid">
            <div className="subjects-list">
              <h4>Subjects</h4>
              <ul>
                {subjects.map((subject, index) => (
                  <li key={`subject-${index}`}>{subject}</li>
                ))}
              </ul>
            </div>
            <div className="slots-list">
              <h4>Slots</h4>
              <ul>
                {slots.map((slot, index) => (
                  <li key={`slot-${index}`}>{slot}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UploadSection;
        