import React, { useEffect, useState } from 'react';

const ApiStatus = () => {
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/health`)
      .then(res => res.json())
      .then(data => setStatus(data))
      .catch(err => setError(err.message));
  }, []);

  if (error) return <div className="api-status error">API Bağlantı Hatası: {error}</div>;
  if (!status) return <div className="api-status loading">API Durumu Kontrol Ediliyor...</div>;

  return (
    <div className="api-status">
      <h3>API Durumu</h3>
      <div>Durum: {status.status}</div>
      <div>Pixabay API Key: {status.env.pixabayKey}</div>
      <div>Pexels API Key: {status.env.pexelsKey}</div>
    </div>
  );
};

export default ApiStatus; 