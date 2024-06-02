import React from "react";
import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-800 py-20">
      <div className="container mx-auto flex flex-col md:flex-row items-center">
        <div className="max-w-xl mx-auto text-center text-white md:text-left md:mr-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            India's Premier Carpooling Platform
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Connecting Travelers, One Ride at a Time
          </p>
          <p className="text-lg mb-8">
            Fast, Flexible, Reliable Carpooling Services
          </p>
          <p className="text-lg font-bold mb-12">
            Your Journey Begins, Sharing Rides Along the Way
          </p>
          <button
            onClick={() => navigate("/search")}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-12 rounded-full transition duration-300 ease-in-out"
          >
            Find a Ride
          </button>
        </div>
        <div className="flex-shrink-0 w-full md:w-1/2">
          <img
            src="https://img.freepik.com/free-vector/sedan-car-concept-illustration_114360-13223.jpg?w=1800&t=st=1713288231~exp=1713288831~hmac=71eeb61d9e5dfed94ff5007730c1c3cc71534da07e3e8140310e60a5ef4c51e0"
            alt="car illustration"
            className="w-[40vw] h-auto rounded-lg shadow-md"
          />
        </div>
      </div>
    </div>
  );
}

export default Hero;
