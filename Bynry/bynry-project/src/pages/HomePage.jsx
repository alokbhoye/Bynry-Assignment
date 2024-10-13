import React, { useState, useEffect } from 'react';
import ProfileList from '../components/ProfileList';
import SearchBar from '../components/SearchBar'; // Import the SearchBar component
import axios from 'axios';

const HomePage = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(''); // State for search input

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await axios.get('http://localhost:5001/profiles'); // Fetch from backend
        setProfiles(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching profiles:', error);
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  const handleDeleteProfile = (id) => {
    setProfiles(profiles.filter((profile) => profile._id !== id));
  };

  // Filter profiles based on search term (by name or description)
  const filteredProfiles = profiles.filter((profile) =>
    profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    profile.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <p>Loading profiles...</p>;
  }

  return (
    <div>
      
      {/* Use the SearchBar component and pass searchTerm and setSearchTerm as props */}
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {/* Pass the filtered profiles to ProfileList */}
      <ProfileList profiles={filteredProfiles} onDelete={handleDeleteProfile} />
    </div>
  );
};

export default HomePage;
