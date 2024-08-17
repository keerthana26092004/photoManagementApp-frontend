
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/Modal';

const GalleryPage = () => {
  const [photos, setPhotos] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const fetchPhotos = async () => {
    try {
      const response = await axios.get('http://localhost:8000/photos');
      if (response.data.success && Array.isArray(response.data.data)) {
        setPhotos(response.data.data);
      } else {
        throw new Error('Unexpected response structure');
      }
    } catch (error) {
      setError('Failed to load photos');
      console.error('Fetch photos error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePhotoClick = (photoId) => {
    if (!token) {
      setModalOpen(true);
    } else {
      navigate(`/photo/${photoId}`); 
    }
  };

  useEffect(() => {
    if (!token) {
      setModalOpen(true);
    } else {
      fetchPhotos();
    }
  }, [token]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      {modalOpen && (
        <Modal open={modalOpen} onClose={() => setModalOpen(false)} />
      )}
      <div className="gallery">
        {photos.length === 0 ? (
          <p>No photos available</p>
        ) : (
          photos.map(photo => (
            <div 
              key={photo._id} 
              className="photo-card" 
              onClick={() => handlePhotoClick(photo._id)}
              style={{ cursor: 'pointer' }}
            >
              <img 
                src={`http://localhost:8000${photo.url}`} 
                alt={photo.title} 
                style={{ width: '100%', height: 'auto' }} 
              />
              <h3>{photo.title}</h3>
              <p>{photo.description}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default GalleryPage;
