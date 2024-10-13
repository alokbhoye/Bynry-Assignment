import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './adminPanel.css'; // Admin panel-specific styles
import SearchBar from '../components/SearchBar'; // Import the SearchBar component

const AdminPanel = () => {
  const [profiles, setProfiles] = useState([]);
  const [newProfile, setNewProfile] = useState({
    name: '',
    description: '',
    address: '',
    photo: '',
  });
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState(''); // State for search input

  // Fetch profiles on component mount
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await axios.get('http://localhost:5001/profiles');
        setProfiles(response.data);
      } catch (error) {
        console.error('Error fetching profiles:', error);
      }
    };

    fetchProfiles();
  }, []);

  // Handle profile deletion
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/profiles/${id}`);
      setProfiles(profiles.filter((profile) => profile._id !== id));
    } catch (error) {
      console.error('Error deleting profile:', error);
    }
  };

  // Handle profile addition
  const handleAddProfile = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/profiles', newProfile);
      setProfiles([...profiles, response.data]); // Add new profile to the list
      setNewProfile({ name: '', description: '', address: '', photo: '' }); // Clear form
      setShowForm(false); // Hide the form after adding
    } catch (error) {
      console.error('Error adding profile:', error);
    }
  };

  // Filter profiles based on search term (by name or description)
  const filteredProfiles = profiles.filter((profile) =>
    profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    profile.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-panel">
      <h2>Admin Panel</h2>

      {/* Use the SearchBar component and pass searchTerm and setSearchTerm as props */}
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {/* Add Profile Button */}
      <button className="add-profile-btn" onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Cancel' : 'Add Profile'}
      </button>

      {/* Add Profile Form */}
      {showForm && (
        <form className="add-profile-form" onSubmit={handleAddProfile}>
          <input
            type="text"
            placeholder="Name"
            value={newProfile.name}
            onChange={(e) => setNewProfile({ ...newProfile, name: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Description"
            value={newProfile.description}
            onChange={(e) => setNewProfile({ ...newProfile, description: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Address"
            value={newProfile.address}
            onChange={(e) => setNewProfile({ ...newProfile, address: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Photo URL"
            value={newProfile.photo}
            onChange={(e) => setNewProfile({ ...newProfile, photo: e.target.value })}
          />
          <button type="submit">Add Profile</button>
        </form>
      )}

      {/* Profile List */}
      <div className="profile-grid">
        {filteredProfiles.map((profile) => (
          <div key={profile._id} className="profile-card">
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
              <p>{profile.address}</p>
              <button className="delete-btn" onClick={() => handleDelete(profile._id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;
