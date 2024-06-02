import React from "react";

const TripCard = ({ trip }) => {
  const today = new Date();
  const tripDate = new Date(trip.time);
  const textColorClass = tripDate < today ? "text-red-900" : "text-green-900";
  const bgColorClass =
    textColorClass === "text-green-900" ? "bg-green-200" : "bg-red-200";

  return (
    <div
      className={`border border-gray-300 rounded-md p-4 mb-2 shadow-lg hover:shadow-xl transition-transform duration-500 ease-in-out transform hover:scale- ${textColorClass} ${bgColorClass}`}
    >
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
        <p className="font-bold text-lg mb-2 sm:mb-0">Source: {trip.source}</p>
        <p className="font-bold text-lg">Destination: {trip.destination}</p>
      </div>
      <div className="flex justify-between items-center mb-4">
        <p className="text-gray-700">Fare: ${trip.fare}</p>
        <p className="text-gray-700">
          Date of Traveling:{" "}
          {new Date(trip.time).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>
      </div>
      {textColorClass === "text-green-900" && (
        <div className="flex justify-end">
          <button className="bg-red-500 text-white rounded-md px-4 py-2 mr-2 hover:bg-red-600 transition-colors duration-300">
            Delete Trip
          </button>
          <button className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 transition-colors duration-300">
            Message Driver
          </button>
        </div>
      )}
    </div>
  );
};

export default TripCard;
