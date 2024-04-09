import React from 'react'
import { useState } from 'react';
import GMap from '../../components/GMap/GMap';

function PublishTrip({user, setUser}){
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [availableSeats, setAvailableSeats] = useState(0);
  const [carModel, setCarModel] = useState('');
  const [maxSeats, setMaxSeats] = useState(0);
  const [date, setDate] = useState('');
  const [fare, setFare] = useState(0);
    const [data, setData] = useState({
        source: '',
        destination: '',
        availableSeats: '',
        
    })
  const handleSubmit = (e) => {
    e.preventDefault();

  };

  return (
    <div className="container mx-auto px-4 py-8 flex">
      <div className='w-1/2 pr-4'>
      <h1 className="text-4xl font-bold mb-6">Publish a Ride</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="source" className="block text-gray-700 font-bold mb-2">
            Source
          </label>
          <input
            type="text"
            id="source"
            required
            value={source}
            onChange={(e) => setSource(e.target.value)}
            className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="destination" className="block text-gray-700 font-bold mb-2">
            Destination
          </label>
          <input 
            type= 'text'
            required
            id= 'destination'
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="availableSeats" className="block text-gray-700 font-bold mb-2">
            Maximum Seats
          </label>
          <input
            type="number"
            required
            id="availableSeats"
            value={availableSeats}
            onChange={(e) => setAvailableSeats(e.target.value)}
            className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="carModel" className="block text-gray-700 font-bold mb-2">
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
          <label htmlFor="maxSeats" className="block text-gray-700 font-bold mb-2">
            Max Seats
          </label>
          <input
            type="number"
            id="maxSeats"
            required
            value={maxSeats}
            onChange={(e) => setMaxSeats(e.target.value)}
            className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="date" className="block text-gray-700 font-bold mb-2">
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
          <label htmlFor="fare" className="block text-gray-700 font-bold mb-2">
            Fare
          </label>
          <input
            type="number"
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
        </div>
      </form>
      </div>
      <div className="w-1/2">
        {<GMap apiKey={'AIzaSyC9hvXTVfqtUfdZc-aj6ikjXapeV_pBWvc'} start={source} end={destination}/>}
        </div>
    </div>
  )
}

export default PublishTrip