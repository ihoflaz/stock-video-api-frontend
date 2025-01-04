import React from 'react';
import VideoList from './VideoList';
import '../styles/VideoColumns.css';

const VideoColumns = () => {
  return (
    <div className="video-columns">
      <div className="column">
        <h2 className="column-title">Pixabay</h2>
        <VideoList source="pixabay" />
      </div>
      <div className="column">
        <h2 className="column-title">Pexels</h2>
        <VideoList source="pexels" />
      </div>
    </div>
  );
};

export default VideoColumns; 