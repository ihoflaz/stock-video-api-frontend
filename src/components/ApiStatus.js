import React, { useEffect, useState } from 'react';

const ApiStatus = () => {
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAPI = async () => {
      try {
        console.log('Checking API at:', process.env.REACT_APP_API_URL);
        
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/health`);
        console.log('API Response:', response);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('API Data:', data);
        
        setStatus(data);
        setError(null);
      } catch (err) {
        console.error('API Error:', err);
        setError(err.message);
        setStatus(null);
      } finally {
        setLoading(false);
      }
    };

    checkAPI();
  }, []);

  if (loading) {
    return (
      <div className="api-status loading">
        <h3>API Durumu Kontrol Ediliyor...</h3>
        <div>API URL: {process.env.REACT_APP_API_URL}</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="api-status error">
        <h3>API Bağlantı Hatası</h3>
        <pre>{error}</pre>
        <div>API URL: {process.env.REACT_APP_API_URL}</div>
        <div>Lütfen backend servisinin çalıştığından emin olun.</div>
      </div>
    );
  }

  return (
    <div className="api-status">
      <h3>API Durumu</h3>
      <div>Durum: {status?.status}</div>
      <div>API URL: {process.env.REACT_APP_API_URL}</div>
      <div>Pixabay API Key: {status?.env?.pixabayKey}</div>
      <div>Pexels API Key: {status?.env?.pexelsKey}</div>
      <div>Son Kontrol: {status?.timestamp}</div>
    </div>
  );
};

export default ApiStatus; 