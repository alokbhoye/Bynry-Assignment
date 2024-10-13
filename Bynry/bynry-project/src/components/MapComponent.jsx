import React, { useEffect, useState, useRef } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import axios from 'axios';

const MapComponent = ({ address }) => {
  const [location, setLocation] = useState({ lat: 0, lng: 0 });
  const [loading, setLoading] = useState(true);
  const mapRef = useRef(null); // Reference to the map

  useEffect(() => {
    const geocodeAddress = async () => {
      try {
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=AIzaSyCaFdDyirXdl-zcNnLbp5k-9yBadGAQu8g`
        );
        if (response.data.results.length > 0) {
          const { lat, lng } = response.data.results[0].geometry.location;
          setLocation({ lat, lng }); // Set the location to the lat/lng from the response
        } else {
          console.error('No results found for the address.');
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching geolocation:', error);
        setLoading(false);
      }
    };

    geocodeAddress();
  }, [address]);

  // Function to add a marker to the map after it has loaded
  const addMarker = (map) => {
    if (window.google && location.lat && location.lng) {
      new window.google.maps.Marker({
        position: location,
        map: map,
        title: "Profile Location",
      });
    }
  };

  return (
    <>
      {loading ? (
        <p>Loading map...</p>
      ) : (
        <GoogleMap
          onLoad={(map) => {
            mapRef.current = map;
            addMarker(map); // Add marker once the map is loaded
          }}
          className="google-map-container"
          center={location}
          zoom={15}
          mapContainerStyle={{ width: '100%', height: '400px' }}
        />
      )}
    </>
  );
};

export default MapComponent;
