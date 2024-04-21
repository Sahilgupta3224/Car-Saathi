import React from "react";

function Analytics3() {
  return (
    <>
      <div className="w-full bg-gradient-to-r from-purple-800 to-green-900 py-12 px-4">
        <div className="max-w-[1240px] mx-auto grid grid-cols-1 md:grid-cols-2 items-center">
          <div className="text-center md:text-left text-white">
            <h1 className="text-[#F0E68C] md:text-5xl sm:text-4xl text-3xl font-bold mb-4 font-serif leading-tight">
              Welcome to Your Dashboard
            </h1>
            <p className="text-justify pr-8 text-base md:text-lg font-serif mb-6">
              Explore your carpooling journey at a glance. From managing your
              rides to tracking your savings, your dashboard is your one-stop
              destination for all things carpooling.
            </p>
            <button className="bg-yellow-300 hover:bg-yellow-400 text-black font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out">
              Start Exploring
            </button>
          </div>
          <img
            src="https://img.freepik.com/free-vector/spreadsheets-concept-illustration_114360-736.jpg?w=1060&t=st=1713291115~exp=1713291715~hmac=5832891075885ab92a215503d4a6830e7b22f5d9f974f741b5aa293eca8627cc"
            alt="Spreadsheet Illustration"
            className="w-[70%] h-[80%] mx-auto my-4 rounded-md shadow-md md:ml-6"
          />
        </div>
      </div>
    </>
  );
}

export default Analytics3;


