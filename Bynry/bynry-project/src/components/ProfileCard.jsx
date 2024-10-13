import React from 'react';
import { useNavigate } from 'react-router-dom';
import './profilecard.css';

const ProfileCard = ({ profile }) => {
  const navigate = useNavigate();

  const handleSummaryClick = () => {
    navigate(`/profile/${profile._id}`); // Use _id from MongoDB, not just id
  };

  return (
    <div className="profile-card">
      <div className="profile-header">
        {profile.photo ? (
          <img
            src={profile.photo}
            alt={`${profile.name}'s photo`}
            className="profile-photo"
          />
        ) : (
          <div className="profile-photo-placeholder"></div>
        )}
      </div>
      <div className="profile-content">
        <h3 className="profile-name">{profile.name}</h3>
        <p className="profile-description">{profile.description}</p>
        <div className="profile-buttons">
          <button className="summary-btn" onClick={handleSummaryClick}>
            Summary
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
