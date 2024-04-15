import React, { useEffect, useState } from 'react';

const BookCard = ({ booking ,name,phone}) => {
    const today = new Date();
  const bookDate = new Date(booking.Date);
  const textColorClass = bookDate < today ? 'text-red-900' : 'text-green-900';
    return (
  <div
  className={` border border-gray-300 rounded-md p-4 transition-transform duration-500 ease-in-out transform hover:scale-105 ${textColorClass} ${
    textColorClass === "text-green-900" ? "bg-green-200" : "bg-red-200"
  }`}
  >
    <div className="flex justify-between items-center mb-4">
      <div>
        <p>Source: {booking.source}</p>
        <p>Destination: {booking.destination}</p>
      </div>
      <p>Fare: {booking.fare}</p>
    </div>
    <div className="flex justify-between items-center mb-4">
      <div>
        <p>Seats: {booking.NoofBookedSeats}</p>
        <p>Driver's phone: {phone}</p>
      </div>
      <div>
        <p>Driver's Name: {name}</p>
        <p>Date of travelling: {new Date(booking.Date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
      </div>
    </div>
    {textColorClass === "text-green-900" ? (
        <div className="flex justify-end">
          <button className="bg-red-500 text-white rounded-md px-4 py-2 mr-2 hover:bg-red-600">
            Delete Trip
          </button>
          <button className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600">
            Message Driver
          </button>
        </div>
      ) : (
        <div></div>
      )}
  </div>
);
};
export default BookCard;