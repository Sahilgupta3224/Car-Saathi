import React from 'react'
import Avatar from '@mui/material/Avatar';
import Navbar from '../../components/Navbar/Navbar.jsx';
import { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import TripCard from './TripCard.jsx';

const Trip =({user,setUser,tripfilldata})=>{
    const [Tripdata,setTripdata] = useState([]);
    useEffect(()=>{
        const getTrips=async()=>{
            try{
                const res = await axios.get(`http://localhost:3001/api/trip/findtrip`,{tripfilldata})
                console.log("data",res.data);
                setTripdata(res.data);
            }catch(err){
                console.log(err);
            }
        }
    })
    return(
        <>
        <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Card Page</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Tripdata?.map((trip) => (
          <TripCard props={trip} setTripdata={setTripdata} Tripdata={Tripdata} user={user} />
        ))} 
      </div>
    </div>
        </>
    )
}

export default Trip;