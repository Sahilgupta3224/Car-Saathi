import React, { useEffect, useState } from 'react';

const BookCard = ({ booking ,name,phone}) => {
    const today = new Date();
  const bookDate = new Date(booking.Date);
  const textColorClass = bookDate < today ? 'text-red-500' : 'text-green-500';
    return (
      <div  className={`trip-card border border-gray-300 rounded-md p-4 ${textColorClass}`}>
        <p>Source: {booking.source}</p>
        <p>Destination: {booking.destination}</p>
        <p>Fare:{booking.fare}</p>
        <p>No of Seats Booked:{booking.NoofBookedSeats}</p>
        <p>Driver's phone:{phone}</p>
        <p>Driver's Name:{name}</p>
        <p>Date of travelling:{booking.Date}</p>
      </div>
    );
};
export default BookCard;