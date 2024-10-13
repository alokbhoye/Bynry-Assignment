// src/components/ProfileList.jsx
import React from 'react';
import ProfileCard from './ProfileCard';

const ProfileList = ({ profiles, onDelete }) => {
  return (
    <div className="profile-grid">
      {profiles.map((profile) => (
        <ProfileCard key={profile.id} profile={profile} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default ProfileList;
