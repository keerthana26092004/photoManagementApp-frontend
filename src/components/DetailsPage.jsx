import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const DetailsPage = () => {
   
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { id } = useParams(); 

  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/photos/${id}`);
        if (response.data.success) {
          setPhoto(response.data.data);
        } else {
          throw new Error('Photo not found');
        }
      } catch (error) {
        setError('Failed to load photo details');
        console.error('Fetch photo error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPhoto();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      {photo ? (
        <div>
          <h1>{photo.title}</h1>
          <img
            src={`http://localhost:8000/uploads/${photo.url}`}
            alt={photo.title}
            style={{ width: '100%', height: 'auto' }}
          />
          <p>{photo.description}</p>
        </div>
      ) : (
        <p>No photo details available</p>
      )}
    </div>
  );
};

export default DetailsPage;
