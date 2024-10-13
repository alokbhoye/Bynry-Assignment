import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import MapComponent from '../components/MapComponent';
import './SummaryPage.css';

const SummaryPage = () => {
  const { id } = useParams(); // Get profile ID from URL
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Log the id to verify it's being passed correctly
  console.log('Profile ID from URL:', id);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/profiles/${id}`);
        setProfile(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching profile:', error);
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  if (loading) {
    return <p>Loading profile...</p>;
  }

  if (!profile) {
    return <p>Profile not found!</p>;
  }

  return (
    <div className="summary-container">
      <div className="profile-details">
        <img src={profile.photo} alt={profile.name} className="profile-image" />
        <h2>{profile.name}</h2>
        <p>{profile.description}</p>
        <p><strong>Address:</strong> {profile.address}</p>
      </div>
      <div className="map-container">
        <h3>Location on Map</h3>
        <MapComponent address={profile.address} />
      </div>
    </div>
  );
};

export default SummaryPage;
