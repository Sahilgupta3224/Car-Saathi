import React from "react";

function Analytics() {
  return (
    <>
      <div className="w-full bg-pink-100 py-12 px-4">
        <div className="max-w-[1240px] mx-auto grid grid-cols-1 md:grid-cols-2 items-up">
          <div className="text-center md:text-left text-gray-800 mt-8 md:mt-0 md:pt-0">
            <p className="text-[#FF69B4] font-bold font-serif text-lg md:text-xl mb-4">
              Explore New Possibilities
            </p>
            <h1 className="text-[#4B0082] md:text-5xl sm:text-4xl text-3xl font-bold mb-4 font-serif leading-tight">
              Find Your Perfect Ride
            </h1>
            <p className="text-justify pr-8 text-base md:text-lg font-serif mb-6">
              Ready to embark on a journey of convenience and affordability? Our
              platform connects you with the best rides tailored to your needs.
              Say goodbye to travel hassles and hello to seamless adventures!
            </p>
            <button className="bg-purple-300 hover:bg-purple-400 text-black font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out">
              Start Exploring
            </button>
          </div>
          <img
            src="https://i.pinimg.com/564x/0e/e8/33/0ee83305fc7d2b3c8015cfb21d61639b.jpg"
            alt="Car Pooling Illustration"
            className="w-[70%] h-[80%] mx-auto my-4 rounded-md shadow-md md:mr-6"
          />
        </div>
      </div>
    </>
  );
}

export default Analytics;
