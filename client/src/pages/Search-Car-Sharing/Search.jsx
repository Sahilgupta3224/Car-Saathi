import React, { useState } from "react";
import axios from "axios";
import GMap from "../../components/GMap/GMap";
import { Autocomplete, LoadScript } from "@react-google-maps/api";
import { GMapAPI } from "../../keys";
import TripList from "../../components/TripCard/TripList";

function SearchTrip() {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState(new Date());
  const [seats, setSeats] = useState(1);
  const [resdata, setResdata] = useState([])
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (seats < 1) {
      alert("Number of seats should be greater than 0.");
      return;
    }

    const data = {
      source,
      destination,
      date: date,
    };
    try {
      const response = await axios.post(
        "http://localhost:3001/api/trip/findtrip",
        data
      );
      setResdata(response.data.trip)
      console.log(resdata)
      console.log("hi from search page");
    } catch (err) {
      if (err.response) {
        alert(err.response.data.message);
      } else {
        console.log(err);
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 flex">
      <div className="w-1/2 pr-4">
        <h1 className="text-4xl font-bold mb-6 text-center">Search a Ride</h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col space-y-4 p-4 bg-white shadow-md rounded-md mx-5"
        >
          <label className="block">
            <span className="text-gray-700">Source:</span>
            <input
              type="text"
              value={source}
              onChange={(e) => setSource(e.target.value)}
              className="block w-full mt-1 border-gray-300 border-2 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </label>
          <label className="block">
            <span className="text-gray-700">Destination:</span>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="block w-full mt-1 border-gray-300 border-2 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </label>
          <label className="block">
            <span className="text-gray-700">Date:</span>
            <input
              type="date"
              value={date.toISOString().slice(0, 10)}
              onChange={(e) => setDate(new Date(e.target.value))}
              className="block w-full mt-1 border-gray-300 border-2 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </label>
          <label className="block">
            <span className="text-gray-700">Number of seats:</span>
            <input
              type="number"
              value={seats}
              onChange={(e) => setSeats(parseInt(e.target.value))}
              className="block w-full mt-1 border-gray-300 border-2 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </label>
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 bg-indigo-500 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 active:bg-indigo-900 focus:outline-none focus:border-indigo-900 focus:ring focus:ring-indigo-300 disabled:opacity-25 transition"
          >
            Search
          </button>
        </form>
        <div className="flex flex-col space-y-4 p-4 bg-white shadow-md rounded-md">
          <TripList trips={resdata} />
        </div>
      </div>
      <div className="w-1/2">
        {<GMap apiKey={GMapAPI} start={source} end={destination}/>}
      </div>
    </div>
  );
}

export default SearchTrip;
