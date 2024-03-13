import React from 'react'
import Avatar from '@mui/material/Avatar';
import Navbar from '../../components/Navbar';
import { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReviewCard from '../../components/Review/ReviewCard';

const Profile = ({user,setUser}) => {
    const params = useParams()
    const [data,setData] = useState({})
    const [rating,setRating] = useState(null)
    useEffect(()=>{
        const getuser = async()=>{
            try{
                const res = await axios.get(`http://localhost:3001/api/user/getUser/${params.id}`);
                console.log(res.data)
                setData(res.data.user);
            }catch(err){
                console.log(err)
            }
        }
        const getrating = async()=>{
            try{
                const res = await axios.get(`http://localhost:3001/api/reviews/getRating/${params.id}`);
                console.log(res.data)
                setRating(res.data.rating);
            }catch(err){
                console.log(err)
            }
        }
        getuser();
        getrating();
    },[params.id])
  return (
    <div>
        <Navbar/>
        <div className="flex flex-col">
            <div className='flex items-center justify-around py-8 px-8'>
            <div>
                <div>
                {data?.username}
                </div>
                <div>
                {!rating ? "-" : rating}
                </div>
            </div>
            <Avatar src="/broken-image.jpg" sx={{width:"200px",height:"200px"}}/> 
            
            </div>
            <div className='justify-center flex'>----------------------------------------------------------------------------------------------------------------------------------------------</div>
        <div className='mx-64 p-4'>
            About
            <div>
                EMAIL: {data?.email}

            </div>
        </div>
        <div className='justify-center flex'>-----------------------------------------------------------------------------------------------------------------------------------------------</div>

        <div className='mx-64 p-4'>
            Reviews
            <ReviewCard/>
        </div>
    </div>
       
    </div>
  )
}

export default Profile