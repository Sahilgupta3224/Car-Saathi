import React from 'react';
import TripCard from './TripCard'; 

const TripList = ({ trips, user}) => {
  return (
    <div className="max-w-screen-lg mx-auto">
      {trips.length === 0 ? (
        <div className="text-center mt-8 text-gray-500">No Trips Exist</div>
      ) : (
        <div className="grid grid-cols-2 gap-16">
          {trips.map((trip, index) => (
<<<<<<< HEAD
            <div key={index} className="w-full">
              <TripCard trip={trip} />
=======
            <div key={index} className="inline-block mx-4">
                {/* {console.log(trip)} */}
              <TripCard trip={trip} user={user}/>
>>>>>>> 4e62de2a034e3730340700a5312820564bf4125b
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TripList;
