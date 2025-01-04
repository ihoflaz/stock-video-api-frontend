import React, { useEffect, useState } from 'react';

const ApiStatus = () => {
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('API URL:', process.env.REACT_APP_API_URL);

    fetch(`${process.env.REACT_APP_API_URL}/api/health`)
      .then(res => {
        console.log('API Response:', res);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        console.log('API Data:', data);
        setStatus(data);
      })
      .catch(err => {
        console.error('API Error:', err);
        setError(err.message);
      });
  }, []);

  if (error) {
    return (
      <div className="api-status error">
        <h3>API Bağlantı Hatası</h3>
        <pre>{error}</pre>
        <div>API URL: {process.env.REACT_APP_API_URL}</div>
      </div>
    );
  }

  if (!status) {
    return (
      <div className="api-status loading">
        <div>API Durumu Kontrol Ediliyor...</div>
        <div>API URL: {process.env.REACT_APP_API_URL}</div>
      </div>
    );
  }

  return (
    <div className="api-status">
      <h3>API Durumu</h3>
      <div>Durum: {status.status}</div>
      <div>API URL: {process.env.REACT_APP_API_URL}</div>
      <div>Pixabay API Key: {status.env.pixabayKey}</div>
      <div>Pexels API Key: {status.env.pexelsKey}</div>
    </div>
  );
};

export default ApiStatus; 