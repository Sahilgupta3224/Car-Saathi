import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const GMap = ({ apiKey }) => {
    const [currentLocation, setCurrentLocation] = useState(null);

    useEffect(() => {
        // Get current location using browser's geolocation API
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setCurrentLocation({ lat: latitude, lng: longitude });
                },
                (error) => {
                    console.error('Error getting current location:', error);
                }
            );
        } else {
            console.error('Geolocation is not supported by this browser');
        }
    }, []);

    const mapStyles = {
        height: "100vh",
        width: "100%"
    };
    return (
        <LoadScript googleMapsApiKey={apiKey}>
            <GoogleMap
                mapContainerStyle={mapStyles}
                zoom={8}
                center={currentLocation || { lat: -34.397, lng: 150.644 }}
            />
        </LoadScript>
    );
};

export default GMap;
