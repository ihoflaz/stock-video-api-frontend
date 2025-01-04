import React from 'react';
import '../styles/TabNavigation.css';

const TabNavigation = ({ activeTab, onTabChange }) => {
  return (
    <div className="tab-navigation">
      <button 
        className={`tab-button ${activeTab === 'pixabay' ? 'active' : ''}`}
        onClick={() => onTabChange('pixabay')}
      >
        Pixabay
      </button>
      <button 
        className={`tab-button ${activeTab === 'pexels' ? 'active' : ''}`}
        onClick={() => onTabChange('pexels')}
      >
        Pexels
      </button>
    </div>
  );
};

export default TabNavigation; 