// src/components/ProfileDetails.jsx
import React from 'react';
import MapComponent from './MapComponent';

const ProfileDetails = ({ selectedProfile }) => {
  if (!selectedProfile) return null;

  return (
    <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc' }}>
      <h2>{selectedProfile.name}'s Details</h2>
      <p><strong>Description:</strong> {selectedProfile.description}</p>
      <p><strong>Address:</strong> {selectedProfile.address}</p>

      <h3>Location on Map</h3>
      <MapComponent address={selectedProfile.address} />
    </div>
  );
};

export default ProfileDetails;
