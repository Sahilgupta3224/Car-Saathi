import React from 'react';

const TripCard = ({ trip }) => {
  const today = new Date();
  const tripDate = new Date(trip.Date);
  const textColorClass = tripDate < today ? 'text-red-500' : 'text-green-500';
  return (
    <div className={`trip-card border border-gray-300 rounded-md p-4 ${textColorClass}`}>
      <p>Source: {trip.source}</p>
      <p>Destination: {trip.destination}</p>
      <p>Fare: {trip.fare}</p>
      <p>Date of traveling: {trip.Date}</p>
    </div>
  );
};

export default TripCard;
