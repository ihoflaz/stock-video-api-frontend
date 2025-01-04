import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { searchPixabayVideos } from '../store/pixabaySlice';
import { searchPexelsVideos } from '../store/pexelsSlice';
import Pagination from './Pagination';
import '../styles/VideoList.css';

const VideoList = ({ source }) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state[source]);
  const { videos, loading, error, currentPage, totalHits, query } = state;

  // Hata ayıklama için log ekleyelim
  console.log(`${source} videos:`, videos);

  // videos undefined veya null ise boş dizi kullan
  const safeVideos = videos || [];

  const itemsPerPage = 20;
  const totalPages = Math.ceil(totalHits / itemsPerPage);

  const handlePageChange = (newPage) => {
    const searchAction = source === 'pixabay' ? searchPixabayVideos : searchPexelsVideos;
    dispatch(searchAction({ query, page: newPage }));
  };

  // Pixabay video bilgilerini düzenle
  const getPixabayVideoInfo = (video) => ({
    id: video.id,
    thumbnail: video.videos.small.thumbnail,
    videoUrl: video.videos.small.url,
    hdVideoUrl: video.videos.large.url,
    tags: video.tags,
    views: video.views,
    likes: video.likes,
    duration: video.duration,
    user: video.user,
    pictures: null // Pixabay önizleme resimleri sunmuyor
  });

  // Pexels video bilgilerini düzenle
  const getPexelsVideoInfo = (video) => {
    // En yüksek kaliteli videoyu bul - Diziyi kopyalayarak sıralama yap
    const hdVideo = [...video.video_files]
      .sort((a, b) => (b.height || 0) - (a.height || 0))[0];
    
    // Oynatma için orta kaliteli video
    const mediumVideo = video.video_files
      .find(v => v.quality === 'sd') || video.video_files[0];

    return {
      id: video.id,
      thumbnail: video.image,
      videoUrl: mediumVideo.link,
      hdVideoUrl: hdVideo.link,
      tags: video.url.split('/').slice(-2)[0].replace(/-/g, ' '), // URL'den video adını al ve formatla
      views: 0, // Pexels görüntülenme sayısı vermiyor
      likes: 0, // Pexels beğeni sayısı vermiyor
      duration: video.duration,
      user: video.user.name,
      pictures: video.video_pictures // Önizleme resimleri
    };
  };

  const getVideoInfo = (video) => 
    source === 'pixabay' ? getPixabayVideoInfo(video) : getPexelsVideoInfo(video);

  const formatTags = (tags) => {
    if (!tags) return '';
    return tags.split(' ')
      .map(tag => tag.charAt(0).toUpperCase() + tag.slice(1))
      .join(', ');
  };

  if (loading) return <div className="loading">Yükleniyor...</div>;
  if (error) return <div className="error">Hata: {error}</div>;

  return (
    <div className="video-list">
      <div className="video-grid">
        {safeVideos.map((video) => {
          const videoInfo = getVideoInfo(video);
          return (
            <div key={videoInfo.id} className="video-item">
              <div className="video-wrapper">
                <video
                  controls
                  poster={videoInfo.thumbnail}
                >
                  <source 
                    src={videoInfo.videoUrl} 
                    type="video/mp4" 
                  />
                  Tarayıcınız video etiketini desteklemiyor.
                </video>
                {videoInfo.pictures && (
                  <div className="video-previews">
                    {videoInfo.pictures.slice(0, 5).map((pic) => (
                      <img 
                        key={pic.id}
                        src={pic.picture}
                        alt={`Preview ${pic.nr}`}
                        className="preview-thumbnail"
                      />
                    ))}
                  </div>
                )}
              </div>
              <div className="video-info">
                <div className="video-info-header">
                  <div className="tags">
                    {formatTags(videoInfo.tags)}
                  </div>
                  <a 
                    href={videoInfo.hdVideoUrl} 
                    download 
                    className="download-button"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    HD İndir
                  </a>
                </div>
                <div className="video-stats">
                  {source === 'pixabay' && (
                    <>
                      <span>👁 {videoInfo.views}</span>
                      <span>❤️ {videoInfo.likes}</span>
                    </>
                  )}
                  <span>⏱ {videoInfo.duration}s</span>
                  <span>👤 {videoInfo.user}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {safeVideos.length > 0 && (
        <Pagination 
          currentPage={currentPage} 
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default VideoList;