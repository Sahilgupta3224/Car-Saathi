import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Navbar from "../../../components/Navbar/Navbar.jsx";
import TripCard from "../../../components/MyRides/trip.jsx";

// Create a styled container with a gradient background effect
const GradientContainer = styled.div`
  background: linear-gradient( to right, #22543d, #1a3a2a); 
  padding: 2rem; /* Add some padding */
  min-height: 100vh; 
  color: white; 
   // display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  text-align: center;
  color: #f9d423; 
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: semi-bold;
  margin-bottom: 1rem;
  margin-top: 2rem;
  color: #f9d423;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

const TripsGrid = styled.div`
  //display: grid;
  margin-top: 1.5rem;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  width: 100%;
`;

const Message = styled.p`
  font-size: 1.25rem;
  text-align: center;
  color: #f9d423;
`;

function DriverRides({ user, setIsLoggedIn }) {
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

  const upcomingTrips = trips.filter(
    (trip) => new Date(trip.time) > new Date()
  );
  const pastTrips = trips.filter((trip) => new Date(trip.time) <= new Date());

  return (
    <>
      <Navbar user={user} setIsLoggedIn={setIsLoggedIn} />
      <GradientContainer>
        <Title>Your Rides</Title>

        {/* Upcoming Rides */}
        <div>
          <SectionTitle>Upcoming Rides:</SectionTitle>
          {upcomingTrips.length > 0 ? (
            <TripsGrid>
              {upcomingTrips.map((trip) => (
                <TripCard key={trip._id} trip={trip} />
              ))}
            </TripsGrid>
          ) : (
            <Message>You have no upcoming rides.</Message>
          )}
        </div>

        {/* Past Rides */}
        <div>
          <SectionTitle>Past Rides:</SectionTitle>
          {pastTrips.length > 0 ? (
            <TripsGrid>
              {pastTrips.map((trip) => (
                <TripCard key={trip._id} trip={trip} />
              ))}
            </TripsGrid>
          ) : (
            <Message>You have no past rides.</Message>
          )}
        </div>
      </GradientContainer>
    </>
  );
}

export default DriverRides;
