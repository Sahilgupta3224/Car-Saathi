import React, { useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar.jsx";
import GMap from "../../components/GMap/GMap";
import { Autocomplete, LoadScript } from "@react-google-maps/api";
import { GMapAPI } from "../../keys";
import TripList from "../../components/TripCard/TripList";
import "./SearchTrip.css";

function SearchTrip({ user }) {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState(new Date());
  const [seats, setSeats] = useState(1);
  const [resdata, setResdata] = useState([]);

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
      setResdata(response.data.trip);
      console.log(resdata);
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
    <>
      
      <Navbar user={user} />
      <div className="container flex flex-col">
        <div className="Top flex">
          <div className="left-section p-4">
            <h1 className="title">Search a Ride</h1>
            <form onSubmit={handleSubmit} className="form">
              <label className="label">
                Source:
                <input
                  type="text"
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                  className="input"
                />
              </label>
              <label className="label">
                Destination:
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="input"
                />
              </label>
              <label className="label">
                Date:
                <input
                  type="date"
                  value={date.toISOString().slice(0, 10)}
                  onChange={(e) => setDate(new Date(e.target.value))}
                  className="input"
                />
              </label>
              <label className="label">
                Number of seats:
                <input
                  type="number"
                  value={seats}
                  onChange={(e) => setSeats(parseInt(e.target.value))}
                  className="input"
                />
              </label>
              <button type="submit" className="search-btn">
                Search
              </button>
            </form>
          </div>
          <div className="left-section">
            {<GMap apiKey={GMapAPI} start={source} end={destination} />}
          </div>
        </div>
        <div className="">
            <TripList trips={resdata} />
        </div>
      </div>
    </>
  );
}

export default SearchTrip;
