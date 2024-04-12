import React from 'react';
import TripCard from './TripCard'; // Assuming TripCard component is imported

const TripList = ({ trips }) => {
  return (
    <div className="max-w-screen-lg mx-auto">
      {trips.length === 0 ? (
        <div className="text-center mt-8 text-gray-500">No Trips Exist</div>
      ) : (
        <div className="overflow-x-auto whitespace-nowrap flex flex-col-reverse">
          {trips.map((trip, index) => (
            <div key={index} className="inline-block mx-4">
                {console.log(trip)}
              <TripCard trip={trip} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TripList;
