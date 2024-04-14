import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import {useNavigate} from 'react-router-dom'

const TripCard = ({trip, user}) => {
  const { driver, CarModel, availableSeats, fare } = trip
  const [driverName, setDrivername] = useState('')
  const [driverMobileNumber, setDriverMobileNumber] = useState('')
  const navigate = useNavigate()
  const handleBook= ()=>{
    console.log(trip)
    navigate('/booking',{state: {trip}})
  }
  // console.log(driver)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/user/getUser/${driver}`);
        const { name, phone } = response.data.user;
        setDrivername(name);
        setDriverMobileNumber(phone);
      } catch (err) {
        if (err.response && err.response.status === 400) {
          alert(err.response.data.message);
        } else {
          console.log(err);
        }
      }
    };

    fetchData();
  }, [driver, trip]);

  return (
    <div className="bg-white overflow-hidden rounded-lg shadow-md">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-center uppercase">{driverName}</h2>
        <div className="flex justify-between mt-4">
          <div>
            <p className="text-gray-700">Car Model:</p>
            <p className="text-gray-700">Available Seats:</p>
            <p className="text-gray-700">Driver Mobile Number:</p>
            <p className="text-gray-700 mt-4">Fare per Seat:</p>
          </div>
          <div>
            <p className="text-blue-600 uppercase">{CarModel}</p>
            <p className="text-blue-600 uppercase">{availableSeats}</p>
            <p className="text-blue-600 uppercase">{driverMobileNumber}</p>
            <p className="text-blue-600 uppercase">{fare}</p>
          </div>
        </div>
      </div>
      <div className="bg-gray-100 p-6 flex items-center justify-center">
        <button className="bg-indigo-500 hover:bg-indigo-800 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110" onClick={handleBook}>
          Book Now
        </button>
      </div>
    </div>
  );
};

export default TripCard;