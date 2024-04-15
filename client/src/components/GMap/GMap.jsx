import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, DirectionsRenderer, DirectionsService} from '@react-google-maps/api';

const GMap = ({ apiKey , start, end}) => {
    const [currentLocation, setCurrentLocation] = useState(null);
    const [response, setResponse] = useState('hello');
    const [error, setError] = useState(null);
    

    //? Function to get user live location using browser
    
    useEffect(() => {
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

    const mapContainerStyle = {
        height: "420px",
        width: "108%",
        margin: "20px auto", 
        borderRadius: "8px", 
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" 
    };

    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ width: "80%" }}> {/* Adjust width as needed */}
                <LoadScript googleMapsApiKey={apiKey}>
                    <GoogleMap
                        mapContainerStyle={mapContainerStyle}
                        zoom={13}
                        center={currentLocation || { lat: -34.397, lng: 150.644 }}
                    >
                        {/* {response && (
                            <DirectionsRenderer
                                options={{
                                    directions: response
                                }}
                            />
                        )}

                        {error && <p>{error}</p>} */}
                    </GoogleMap>
                </LoadScript>
            </div>
        </div>
    );
};

export default GMap;
