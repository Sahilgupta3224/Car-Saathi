import React from 'react';
import TripCard from './TripCard'; 

const TripList = ({ trips }) => {
  return (
    <div className="max-w-screen-lg mx-auto">
      {trips.length === 0 ? (
        <div className="text-center mt-8 text-gray-500">No Trips Exist</div>
      ) : (
        <div className="grid grid-cols-2 gap-16">
          {trips.map((trip, index) => (
            <div key={index} className="w-full">
              <TripCard trip={trip} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TripList;
