import React, { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar/Navbar.jsx";
import BookCard from "../../../components/MyRides/book.jsx";
import axios from "axios";
import styled from "styled-components";

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
  font-weight: 600;
  margin-bottom: 1rem;
  margin-top: 2rem;
  color: #f9d423;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px; /* Adjust the gap between grid items */
`;

function Rider({ user, setCurrentChat, currentChat, setIsLoggedIn }) {
  const [bookings, setBookings] = useState([]);
  const [driverNames, setDriverNames] = useState({});
  const [driverPhones, setDriverPhones] = useState({});
  const [driver,setDriver] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDriverNames = async () => {
      const names = {};
      const phones = {};
      const driverid={};
      await Promise.all(
        bookings.map(async (booking) => {
          try {
            const res = await axios.get(
              `http://localhost:3001/api/user/getUser/${booking.Driver}`
            );
            names[booking._id] = res.data.user.name;
            phones[booking._id] = res.data.user.phone;
            driverid[booking._id] = res.data.user._id;
          } catch (err) {
            console.error(err);
            names[booking._id] = '';
            phones[booking._id] = '';
            driverid[booking._id]= '';
          }
        })
      );
      setDriverNames(names);
      setDriverPhones(phones);
      setDriver(driverid);
    };

    fetchDriverNames();
  }, [bookings]);

  useEffect(() => {
    const getBookings = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/booking/mybookings/${user._id}`
        );
        console.log(response);
        console.log(response.data)
        setBookings(response.data.book);
        setIsLoading(false)
      } catch (err) {
        if (err.response && err.response.status === 400) {
          return;
        }
        if (err.response) {
          console.log(err);
        } else {
          console.log(err);
        }
      }
    };

    getBookings();
  }, []);
  const pastBooking = bookings.filter((book)=>{
    const bookDate = new Date(book.Date);
    return bookDate <= new Date();
  });

  const upcomingBooking = bookings.filter((book) => {
    const bookDate = new Date(book.Date);
    return bookDate > new Date();
  })

  const handleDeleteBooking = async (bookingId) => {
    try {
        await axios.delete(`http://localhost:3001/api/booking/cancelbooking/${bookingId}`);
        // Update bookings state after successful deletion
        setBookings(bookings.filter(booking => booking._id !== bookingId));
    } catch (error) {
        console.error('Error deleting booking:', error);
    }
};

  return (
    <div
      style={{
        background: "linear-gradient(to right, #22543d, #1a3a2a)",
        minHeight: "100vh",
      }}
    >
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Navbar user={user} setIsLoggedIn={setIsLoggedIn} />
          <div className="mx-auto px-4 py-8">
            <Title>Your Bookings</Title>

            <SectionTitle>Upcoming Bookings :</SectionTitle>
            <GridContainer>
              {upcomingBooking.map((booking) => (
                <BookCard
                  key={booking._id}
                  driverid={driver[booking._id]}
                  booking={booking}
                  name={driverNames[booking._id] || ""}
                  phone={driverPhones[booking._id] || ""}
                  setCurrentChat={setCurrentChat}
                  currentChat={currentChat}
                />
              ))}
            </GridContainer>

            <SectionTitle>Past Bookings :</SectionTitle>
            <GridContainer>
              {pastBooking.map((booking) => (
                <BookCard
                  key={booking._id}
                  driverid={driver[booking._id]}
                  booking={booking}
                  name={driverNames[booking._id] || ""}
                  phone={driverPhones[booking._id] || ""}
                  setCurrentChat={setCurrentChat}
                  currentChat={currentChat}
                />
              ))}
            </GridContainer>
          </div>
        </>
      )}
    </div>
  );
}

export default Rider;
