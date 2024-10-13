import React from 'react';
import './searchbar.css'

// The SearchBar component takes two props: searchTerm and setSearchTerm
const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div>
      <input
        type="text"
        placeholder="Search by name or description..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ padding: '10px', marginBottom: '20px', width: '100%', maxWidth: '300px' }}
      />
    </div>
  );
};

export default SearchBar;
