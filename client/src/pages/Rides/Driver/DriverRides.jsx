import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Navbar from "../../../components/Navbar/Navbar.jsx";
import TripCard from "../../../components/MyRides/trip.jsx";
import Paper from '@mui/material/Paper';
import { styled as sty} from '@mui/material/styles';

const DemoPaper = sty(Paper)(({ theme }) => ({
  width: 120,
  height: 120,
  padding: theme.spacing(2),
  ...theme.typography.body2,
  textAlign: 'center',
}));

// Create a styled container with a gradient background effect
// const GradientContainer = styled.div`
//   background: linear-gradient( to right, #22543d, #1a3a2a); 
//   padding: 2rem; /* Add some padding */
//   min-height: 100vh; 
//   color: white; 
//    // display: flex;
//   flex-direction: column;
//   align-items: center;
// `;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
    text-align: center;
  color: #171717; 
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: semi-bold;
  margin-bottom: 1rem;
  margin-top: 2rem;
  color: #171717;
`;

const TripsGrid = styled.div`
  display: grid;
  margin-top: 1.5rem;
  grid-template-columns: repeat(2,1fr);
  gap: 1rem;
  width: 100%;
`;

const Message = styled.p`
  font-size: 1.25rem;
  text-align: center;
  color: #9ca3af;
`;

function DriverRides({ user, setIsLoggedIn }) {
  const [trips, setTrips] = useState([]);
  const [update,setupdate]=useState(false);
  useEffect(() => {
    const getTrips = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/trip/mytrips/${user._id}`
        );
        // console.log(user._id);
        console.log(response.data.trips);
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
  }, []);



  const upcomingTrips = trips.filter((trip) => {
    const tripDate = new Date(trip.time);
    return tripDate > new Date();
  });
  console.log(upcomingTrips)

  const pastTrips = trips.filter((trip) => {
    const tripDate = new Date(trip.time);
    return tripDate <= new Date();
  });

  return (
    <>
      <Navbar user={user} setIsLoggedIn={setIsLoggedIn} />
      {/* <GradientContainer> */}
      <div className="p-8">
        <Title>Your Rides</Title>

        {/* Upcoming Rides */}
        <div>
          <SectionTitle>Upcoming Rides:</SectionTitle>
          {upcomingTrips.length > 0 ? (
            <TripsGrid>
              {upcomingTrips.map((trip) => (
                <TripCard key={trip._id} trip={trip} setupdate={setupdate}/>
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
                <TripCard key={trip._id} trip={trip} setupdate={setupdate} />
              ))}
            </TripsGrid>
          ) : (
            <Message>You have no past rides.</Message>
          )}
        </div>
        </div>
      {/* </GradientContainer> */}
    </>
  );
}

export default DriverRides;
