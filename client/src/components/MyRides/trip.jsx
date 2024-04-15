import React from "react";

const TripCard = ({ trip }) => {
  const today = new Date();
  const tripDate = new Date(trip.Date);
  const textColorClass = tripDate < today ? "text-red-900" : "text-green-900";
  return (
    <div
      className={`border border-gray-300 rounded-md p-4 transition-transform duration-500 ease-in-out transform hover:scale-105 ${textColorClass} ${
        textColorClass === "text-green-900" ? "bg-green-200" : "bg-red-200"
      }`}
    >
      <div className="flex justify-between items-center mb-4">
        <p>Source: {trip.source}</p>
        <p>Destination: {trip.destination}</p>
      </div>
      <div className="flex justify-between items-center mb-4">
        <p>Fare: {trip.fare}</p>
        <p>
          Date of Traveling:{" "}
          {new Date(trip.Date).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>
      </div>
      {/* {textColorClass === "text-green-900" ? (
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
      )} */}
    </div>
  );
};

export default TripCard;