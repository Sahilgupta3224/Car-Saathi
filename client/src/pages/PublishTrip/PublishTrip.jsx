import React, { useEffect, useReducer, useRef } from "react";
import { useState } from "react";
import GMap from "../../components/GMap/GMap";
import { Autocomplete, GoogleMap, LoadScript, DirectionsRenderer, DirectionsService, useLoadScript} from '@react-google-maps/api';
import { GMapAPI } from "../../keys";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function PublishTrip({ user, setUser }) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyClnzcci8V997acQhlpEiYhaLlz_ogR_Vc",
    libraries: ["places"],
  });

  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [availableSeats, setAvailableSeats] = useState();
  const [carModel, setCarModel] = useState("");
  const [maxSeats, setMaxSeats] = useState();
  const [date, setDate] = useState(new Date());
  const [fare, setFare] = useState(0);
  const navigate = useNavigate();
  const sourceRef = useRef();
  const destinationRef = useRef();
  const [routeLoading, setRouteLoading] = useState();
  const [directionResponses, setDirectionsResponses] = useState();
  
  if (!isLoaded) return <div>Loading... Hi Hi</div>;



  const onSourceChange = (place) => {
    setSource(sourceRef.current.value);
    };

  async function calculateRoute() {
    if (source === "" || destination === "") {
      toast.error("Please enter Origin and Destination", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    setRouteLoading(true);
    const directionsService = new window.google.maps.DirectionsService()

    try {
      const results = await directionsService.route({
        origin: source,
        destination: destination,
        provideRouteAlternatives: true,
        travelMode: "DRIVING",
      });
      setRouteLoading(false);

      if (results.status !== "OK") {
        throw new Error("Error: " + results.status);
      }

      // console.log(results);
      setDirectionsResponses(results);
    } catch (error) {
      console.error("Error calculating route:", error);
      toast(
        <div className="border border-red-500 text-red-500 font-semibold rounded-md p-3 shadow-md">
          Error calculating route: {error.message}
        </div>,
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        }
      );
      setRouteLoading(false);
    }
  }

  const handleDestinationChange = () => {
    setDestination(destinationRef.current.value);
  };

  const handleSubmit = async (e) => {
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
    setSource(sourceRef.current.value);
    setDestination(destinationRef.current.value);
    // console.log(source, "hihi", destination);
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
    // console.log(data)
    try{
      await axios.post('http://localhost:3001/api/trip/createtrip', data);
      console.log('response is send')
      navigate('/')
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
      <div className="z-10">
        <Navbar user={user} />
      </div>
      <div className="container mx-auto px-4 py-8 flex">
        <div className="w-1/2 pr-4">
          <h1 className="text-4xl font-bold mb-6">Publish a Ride</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="Source"
                className="block text-gray-700 font-bold mb-2"
              >
                Source
              </label>
              <Autocomplete onPlaceChanged={onSourceChange}>
                <input
                  type="text"
                  placeholder="Enter source location"
                  ref={sourceRef}
                  required
                  className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                />
              </Autocomplete>
            </div>
            <div className="mb-4">
              <label
                htmlFor="Destination"
                className="block text-gray-700 font-bold mb-2"
              >
                Destination
              </label>
              <Autocomplete onPlaceChanged={handleDestinationChange}>
                <input
                  type="text"
                  required
                  placeholder="Enter destination location"
                  ref={destinationRef}
                  className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                />
              </Autocomplete>
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
                  setAvailableSeats(e.target.value);
                }}
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
                onClick={calculateRoute}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Show Routes
              </button>
            </div>
          </form>
        </div>
        <div className="w-1/2">
          {<GMap apiKey={GMapAPI} start={source} end={destination} directionsResponses={directionResponses} />}
        </div>
        <ToastContainer />
      </div>
    </>
  );
}

export default PublishTrip;
