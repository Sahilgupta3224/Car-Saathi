import React from 'react'
import TypedComp from './TypedComp'


function Hero(){
  return (
    <>
    <div className='text-black '>
      <div className='max-w-full mt-[-96px] mr-0 w-full h-[80vh] mx-top text-center flex flex-col justify-center bg-slate-500'>
        <p className='text-[#00df9a] uppercase font-bold font-serif text-1xl p-2' >Connecting Travelers, One Ride at a Time.</p>
        <h1 className='md:text-5xl sm:text-4xl text-3xl font-bold md:py-3  font-serif '>India's No.1 Car Pooling Website</h1>
        <div>
          <h2 className='md:text-3xl sm:text-2xl text-xl font-serif'>Fast, Flexible, Reliable Car Pooling : </h2>
        </div>
        {/* <ReactTyped strings={['Greener', 'Cheaper', "Smarter"]}  typeSpeed={120} backSpeed={140} loop ></ReactTyped> */}
        {/* <TypedComp/> */}
        {/*//! Look Into the above as it is throwing the errors 
        */}
        <p className='md:2xl sm:xl xl font-serif text-[#318e9c] font-bold mt-5'>Your Expedition Begins, Sharing Rides Along the Way.</p>
        <button className='font-mono mt-3 bg-[#00df9a] hover:bg-[#407b69] w-[200px] font-medium text-black border-1 rounded-md mx-auto my-10 py-3'>Find a Ride</button>
        
      </div>

      </div>
    </>
    
  )
}

export default Hero