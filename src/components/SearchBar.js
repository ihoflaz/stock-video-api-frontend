import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchPixabayVideos } from '../store/pixabaySlice';
import { searchPexelsVideos } from '../store/pexelsSlice';
import '../styles/SearchBar.css';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      dispatch(searchPixabayVideos({ query }));
      dispatch(searchPexelsVideos({ query }));
    }
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          className="search-input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Video ara..."
        />
        <button type="submit" className="search-button">
          Ara
        </button>
      </form>
    </div>
  );
};

export default SearchBar;