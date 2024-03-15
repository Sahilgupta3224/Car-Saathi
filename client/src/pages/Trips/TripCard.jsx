import React from 'react'
import Avatar from '@mui/material/Avatar';
import Navbar from '../../components/Navbar/Navbar.jsx';
import { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const TripCard =({props,setTripdata,Tripdata,user})=>{
    const [driver,setdriver] = useState([]);
    useEffect(()=>{
        const getuser = async()=>{
            try{
                const res = await axios.get(`http://localhost:3001/api/user/getUser/${props.driver}`);
                console.log(res.data)
                setdriver(res.data.user);
            }catch(err){
                console.log(err)
            }
        }
        getuser();
    },[])
    return(
        <>
        {/* <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Card Page</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card, index) => ( */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-lg font-semibold mb-2">props.source</h2>
            <p className="text-gray-700">props.destination</p>
            <p className="text-gray-700">driver.name</p>
            <p className="text-gray-700">props.availableSeats</p>  
            <p className="text-gray-700">props.Carmodel</p>
            <p className="text-gray-700">props.Max_Seats</p>
            <p className="text-gray-700">props.fare</p>
          </div>
        {/* ))} */}
      {/* </div>
    </div> */}
        </>
    )
}

export default TripCard;