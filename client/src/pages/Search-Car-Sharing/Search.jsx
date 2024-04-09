import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar'
import React, { useState } from 'react';

const Search = () => {
    const navigate=useNavigate()
    const [tripData, setData] = useState({
        source: '',
        destination: '',
        date: `${new Date()}`,
        passengers: '1'
    })
    const handleTripInput = (name) => (e) => {
        setData({ ...tripData, [name]: e.target.value });
      };
    const handleSearch = () => {
        console.log(`Searching for trips from ${tripData.source} to ${tripData.destination} on ${tripData.date} for ${tripData.passengers} passenger(s).`);

        navigate('/trips');
    };

    return (
        <>
        <Navbar/>
        <div className="flex items-center m-8 py-16 rounded-md">
            <input
                type="text"
                id="from"
                placeholder="Leaving from"
                className="w-[80%] p-5 border border-gray-300 rounded-l-3xl shadow-md placeholder:text-zinc-900"
                value={tripData.source}
                onChange={handleTripInput('source')}
            />
            <input
                type="text"
                id="to"
                placeholder="Going to"
                className="w-[80%] p-5 border border-gray-300 shadow-md placeholder:text-zinc-900"
                value={tripData.destination}
                onChange={handleTripInput('destination')}
            />
            <input
                type="date"
                id="date"
                className="w-[50%] p-5 border border-gray-300 shadow-md placeholder:text-zinc-900"
                placeholder='Today'
                value={tripData.date}
                onChange={handleTripInput('date')}
            />
            <select
                id="passengers"
                className="w-[60%] p-6 border border-gray-300 shadow-md placeholder:text-zinc-900"
                value={tripData.passengers}
                onChange={handleTripInput('passengers')}
            >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
            <button
                className="bg-blue-500 w-[50%] text-white p-6 rounded-r-3xl shadow-lg"
                onClick={handleSearch}
            >Search</button>
        </div>
        </>
        )

}


export default Search