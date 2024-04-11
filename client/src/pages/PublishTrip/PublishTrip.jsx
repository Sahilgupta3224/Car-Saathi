import React, { useEffect, useReducer, useRef } from "react";
import { useState } from "react";
import GMap from "../../components/GMap/GMap";
import { Autocomplete, LoadScript } from "@react-google-maps/api";
import { GMapAPI } from "../../keys";
import axios from 'axios'
import AutocompleteExample from "../../components/GMap/Search";
import Navbar from "../../components/Navbar/Navbar";

function PublishTrip({ user, setUser }) {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [availableSeats, setAvailableSeats] = useState();
  const [carModel, setCarModel] = useState("");
  const [maxSeats, setMaxSeats] = useState();
  const [date, setDate] = useState(new Date());
  const [fare, setFare] = useState(0);
  const handleSubmit = async(e) => {
    e.preventDefault();
    if (availableSeats > maxSeats || availableSeats < 0) {
      alert("Maximum seats should be greater than or equal to available seats.");
      return;
    }
    if(maxSeats <1){
      alert('Maximum Seats should be greater than 0.')
      return;
    }
    if (new Date(date) <= new Date()) {
      alert("Date should be selected from today onwards.");
      return;
    }
    if (fare <= 0) {
      alert("Fare should be greater than 0.");
      return;
    }
    const data = {
      source,
      destination,
      availableSeats,
      CarModel: carModel,
      Max_Seats: maxSeats,
      time: date,
      fare,
      driver: user
    };
    console.log(user)
    try{
      const response = await axios.post('http://localhost:3001/api/trip/createtrip', data);
      console.log('response is send')
    }catch(err){
      if (err.response && err.response.status === 400) {
        alert(err.response.data.message);
      } else {
        console.log(err);
      }
    }
  };

  return (
    <>
    <Navbar/>
    <div className="container mx-auto px-4 py-8 flex">
      <div className="w-1/2 pr-4">
        <h1 className="text-4xl font-bold mb-6">Publish a Ride</h1>
        <form onSubmit={handleSubmit}>
          {/* <div className="mb-4">
            <AutocompleteExample/>
          </div> */}
          {/* <div className="mb-4">
        <LoadScript googleMapsApiKey={GMapAPI} libraries={['places']}>
          <label htmlFor="destination" className="block text-gray-700 font-bold mb-2">
            Destination
          </label>
          <Autocomplete onLoad={(autocomplete) => console.log('Autocomplete loaded:', autocomplete)}
                onPlaceChanged={(autocomplete) => handleDestinationChange(autocomplete.getPlace())}
          >
          <input 
            type= 'text'
            required
            id= 'destination'
            value={destination}
            className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          />
          </Autocomplete>
          </LoadScript>
        </div> */}
        <div className="mb-4">
            <label
              htmlFor="Source"
              className="block text-gray-700 font-bold mb-2"
            >
              Source
            </label>
            <input
              type="text"
              required
              id="Source"
              value={source}
              onChange={(e) => setSource(e.target.value)}
              className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="Destination"
              className="block text-gray-700 font-bold mb-2"
            >
              Destination
            </label>
            <input
              type="text"
              required
              id="destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="availableSeats"
              className="block text-gray-700 font-bold mb-2"
            >
              Available Seats
            </label>
            <input
              type="text"
              required
              id="availableSeats"
              value={availableSeats}
              onChange={(e) => {
                setAvailableSeats(e.target.value)
                }
              }
              className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="carModel"
              className="block text-gray-700 font-bold mb-2"
            >
              Car Model
            </label>
            <input
              type="text"
              id="carModel"
              required
              value={carModel}
              onChange={(e) => setCarModel(e.target.value)}
              className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="maxSeats"
              className="block text-gray-700 font-bold mb-2"
            >
              Max Seats
            </label>
            <input
              type="text"
              id="maxSeats"
              required
              value={maxSeats}
              onChange={(e) => setMaxSeats(e.target.value)}
              className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="date"
              className="block text-gray-700 font-bold mb-2"
            >
              Date
            </label>
            <input
              type="date"
              id="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="fare"
              className="block text-gray-700 font-bold mb-2"
            >
              Fare
            </label>
            <input
              type="text"
              id="fare"
              required
              value={fare}
              onChange={(e) => setFare(e.target.value)}
              className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Publish
            </button>
            <button
              type="button"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Show Routes
            </button>
          </div>
        </form>
      </div>
      <div className="w-1/2">
        {<GMap apiKey={GMapAPI} start={source} end={destination}/>}
      </div>
    </div>
    </>
  );
}

export default PublishTrip;
