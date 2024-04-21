import React from "react";

function Analytics() {
  return (
    <>
      <div className="w-full bg-gradient-to-r from-green-800 to-green-900 py-12 px-4">
        <div className="max-w-[1240px] mx-auto grid grid-cols-1 md:grid-cols-2 items-up">
          <img
            src="https://img.freepik.com/free-vector/spreadsheets-concept-illustration_114360-736.jpg?w=1060&t=st=1713291115~exp=1713291715~hmac=5832891075885ab92a215503d4a6830e7b22f5d9f974f741b5aa293eca8627cc"
            alt="Spreadsheet Illustration"
            className="w-[70%] h-[80%] mx-auto my-4 rounded-md shadow-md md:ml-6"
          />
          <div className="text-center md:text-left text-white mt-8 md:mt-0 md:pt-0">
            <p className="text-[#F0E68C] font-bold font-serif text-lg md:text-xl mb-4">
              Discover Your Next Adventure
            </p>
            <h1 className="text-[#ff9879] md:text-5xl sm:text-4xl text-3xl font-bold mb-4 font-serif leading-tight">
              Find the Cheapest Rides Anywhere
            </h1>
            <p className="text-justify pr-8 text-base md:text-lg font-serif mb-6">
              Are you ready to embark on unforgettable journeys without breaking
              the bank? With our platform, discover the most affordable rides to
              your dream destinations. Say yes to adventures!
            </p>
            <button className="bg-yellow-300 hover:bg-yellow-400 text-black font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out">
              Start Your Adventure
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Analytics;
