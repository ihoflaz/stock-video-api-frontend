import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import SearchBar from './components/SearchBar';
import VideoColumns from './components/VideoColumns';
import './styles/App.css';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <h1>Stock Video Arama</h1>
        <SearchBar />
        <VideoColumns />
      </div>
    </Provider>
  );
}

export default App;
