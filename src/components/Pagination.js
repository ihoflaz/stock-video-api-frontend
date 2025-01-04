import React from 'react';
import '../styles/Pagination.css';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="pagination">
      <button 
        className="pagination-button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Önceki
      </button>
      
      <span className="pagination-info">
        Sayfa {currentPage} / {totalPages}
      </span>

      <button 
        className="pagination-button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Sonraki
      </button>
    </div>
  );
};

export default Pagination; 