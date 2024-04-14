import React from "react";

const TripCard = ({ trip }) => {
  const today = new Date();
  const tripDate = new Date(trip.Date);
  const textColorClass = tripDate < today ? "text-red-500" : "text-green-500";
  return (
    <div
      className={`trip-card border border-gray-300 rounded-md p-4 transition-transform duration-500 ease-in-out transform hover:scale-105 ${textColorClass} ${
        textColorClass === "text-green-500" ? "bg-green-200" : "bg-red-200"
      }`}
    >
      <div className="flex justify-between items-center mb-4">
        <p>Source: {trip.source}</p>
        <p>Destination: {trip.destination}</p>
      </div>
      <div className="flex justify-between items-center mb-4">
        <p>Fare: {trip.fare}</p>
        <p>
          Date of traveling:{" "}
          {new Date(trip.Date).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>
      </div>
    </div>
  );
};

export default TripCard;
