import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar.jsx';
import axios from 'axios';
import TripCard from '../../components/MyRides/trip.jsx';
import BookCard from '../../components/MyRides/book.jsx';
function Rides({ user }) {
  const [trips, setTrips] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [driverNames, setDriverNames] = useState({});
  const [driverPhones, setDriverPhones] = useState({});

    useEffect(() => {
        const fetchDriverNames = async () => {
          const names = {};
          const phones={};
          await Promise.all(
            bookings.map(async (booking) => {
              try {
                const res = await axios.get(
                  `http://localhost:3001/api/user/getUser/${booking.Driver}`
                );
                names[booking._id] = res.data.user.name;
                phones[booking._id] = res.data.user.phone;
              } catch (err) {
                console.error(err);
                names[booking._id] = '';
                phones[booking._id] = '';
              }
            })
          );
          setDriverNames(names);
          setDriverPhones(phones)
        };
    
        fetchDriverNames();
      }, [bookings]);

  useEffect(() => {
    const getTrips = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/trip/mytrips/${user._id}`
        );
        setTrips(response.data.trips);
        console.log(response.data.trips);
      } catch (err) {
        if (err.response) {
          alert(err.response.data.message);
        } else {
          console.log(err);
        }
      }
    };
    const getBookings = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/booking/mybookings/${user._id}`
        );
        setBookings(response.data.book);
        console.log(response.data.book);
      } catch (err) {
        if (err.response) {
          alert(err.response.data.message);
        } else {
          console.log(err);
        }
      }
    };

    getTrips();
    getBookings();
  }, [user._id]);

  console.log(bookings);
   
  return (
    <div>
      {trips.map((trip) => {
        return <TripCard key={trip._id} trip={trip} />;
      })}
      {bookings.map((booking) => (
        <BookCard key={booking._id} booking={booking} name={driverNames[booking._id] || ''} phone={driverPhones[booking._id] || ''}/>
      ))}
    </div>
  );
}

export default Rides;