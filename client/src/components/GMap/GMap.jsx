import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, DirectionsRenderer, DirectionsService} from '@react-google-maps/api';

const GMap = ({ apiKey , start, end}) => {
    const [currentLocation, setCurrentLocation] = useState(null);
    const [response, setResponse] = useState('hello');
    const [error, setError] = useState(null);
    
    useEffect(() => {
        if (start && end) {
            const directionsService = new window.google.maps.DirectionsService();
            directionsService.route(
                {
                    origin: start,
                    destination: end,
                    travelMode: 'DRIVING',
                    optimizeWaypoints: true,
                    provideRouteAlternatives: true
                },
                (result, status) => {
                    if (status === 'OK') {
                        setResponse(result);
                    } else {
                        setError(status);
                    }
                }
            );
        }
    }, [start, end]);
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

    const mapStyles = {
        height: "100vh",
        width: "100%"
    };
    return (
        //using loadScripter by react-google-maps/api to load the google map
        <LoadScript googleMapsApiKey={apiKey}>
            <GoogleMap
                mapContainerStyle={mapStyles}
                zoom={8}
                //set the center of the map as the user location
                center={currentLocation || { lat: -34.397, lng: 150.644 }}
            >
                {response && (
                    <DirectionsRenderer
                        options={{
                            directions: response
                        }}
                    />
                )}

                {error && <p>{error}</p>}
            </GoogleMap>
        </LoadScript>
    );
};

export default GMap;
