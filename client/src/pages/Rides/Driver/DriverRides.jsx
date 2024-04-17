import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../../components/Navbar/Navbar.jsx";
import TripCard from "../../../components/MyRides/trip.jsx";

function DriverRides({ user,setIsLoggedIn }) {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const getTrips = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/trip/mytrips/${user._id}`
        );
        setTrips(response.data.trips);
      } catch (err) {
        if (err.response) {
          alert(err.response.data.message);
        } else {
          console.log(err);
        }
      }
    };
    getTrips();
  }, [user._id]);

  const upcomingTrips = trips.filter((trip) => {
    const tripDate = new Date(trip.Date);
    return tripDate > new Date();
  });

  const pastTrips = trips.filter((trip) => {
    const tripDate = new Date(trip.Date);
    return tripDate <= new Date();
  });

  return (
    <>
      <Navbar user={user} setIsLoggedIn={setIsLoggedIn}/>
      {/* <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-semibold mb-6">Your Rides</h1>
        <h2 className="text-2xl font-semibold mb-4">Upcoming Rides</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {upcomingTrips.map((trip) => {
            return <TripCard key={trip._id} trip={trip} />;
          })}
        </div>
        <h2 className="text-2xl font-semibold mb-4 mt-8">Past Rides</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pastTrips.map((trip) => {
            return <TripCard key={trip._id} trip={trip} />;
          })}
        </div>
      </div> */}
      <div className="mx-auto px-4 py-8">
  <h1 className="text-3xl font-semibold mb-6">Your Rides</h1>
  
  {/* Upcoming Rides */}
  <div>
    <h2 className="text-2xl font-semibold mb-4">Upcoming Rides</h2>
    {upcomingTrips.length > 0 ? (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {upcomingTrips.map((trip) => {
          return <TripCard key={trip._id} trip={trip} />;
        })}
      </div>
    ) : (
      <p className="text-lg">You have no upcoming rides.</p>
    )}
  </div>

  {/* Past Rides */}
  <div>
    <h2 className="text-2xl font-semibold mb-4 mt-8">Past Rides</h2>
    {pastTrips.length > 0 ? (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {pastTrips.map((trip) => {
          return <TripCard key={trip._id} trip={trip} />;
        })}
      </div>
    ) : (
      <p className="text-lg">You have no past rides.</p>
    )}
  </div>
</div>
    </>
  );
}

export default DriverRides;
