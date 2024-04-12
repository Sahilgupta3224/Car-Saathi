import React from 'react';
import { useNavigate } from 'react-router-dom';


function Hero() {
  const navigate = useNavigate()
  return (
    <div className={'text-[#f44336]'}>
      <div className='  max-w-full mt-[-96px] mr-0 w-full h-[80vh] mx-top text-center flex flex-col justify-center'>
        <p className='text-[#4caf50] uppercase font-bold  text-2xl p-2'>Connecting Travelers, One Ride at a tieme.</p>
        <h1 className='md:text-5xl sm:text-4xl text-3xl font-bold md:py-3'>India's No.1 Car Pooling Website</h1>
        <div>
          <h2 className='md:text-3xl sm:text-2xl text-xl  text-[#f5f5f5]'>Fast, Flexible, Reliable Car Pooling </h2>
        </div>
        <p className='md:2xl sm:xl xl text-[#00bcd4] font-bold mt-5'>Your Expedition Begins, Sharing Rides Along the Way.</p>
        <button onClick={()=>{
          navigate('/search')
        }} className='mt-3 bg-[#4caf50] hover:bg-[#8bc34a] w-[200px] font-medium text-black border-1 rounded-md mx-auto my-10 py-3'>Find a Ride</button>
      </div>
    </div>
  );
}

export default Hero;
