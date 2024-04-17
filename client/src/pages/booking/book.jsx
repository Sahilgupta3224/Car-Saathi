import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar.jsx";
import "./book.css";
import axios from "axios";
import useRazorpay from "react-razorpay"; // Import the Razorpay component
import { useLocation, useNavigate } from "react-router-dom";

function BookingPage({ user, setUser,setIsLoggedIn }) {
  const [seatsToBook, setSeatsToBook] = useState("");
  const [seatPreference, setSeatPreference] = useState("");
  const [remarks, setRemarks] = useState("");
  const [Razorpay] = useRazorpay();
  const state = useLocation();
  const { trip } = state.state || {};

  const handleSeatsToBookChange = (e) => {
    setSeatsToBook(e.target.value);
  };

  const handleSeatPreferenceChange = (e) => {
    setSeatPreference(e.target.value);
  };

  const handleRemarksChange = (e) => {
    setRemarks(e.target.value);
  };
  const navigate = useNavigate()
  const bookingConfirm = async(di, order, signature )=>{
    const data = {
      Driver: trip.driver,
      Bookingperson: user,
      trip: trip._id,
      NoofBookedSeats: seatsToBook,
      source: trip.source,
      destination: trip.destination,
      Date: trip.time,
      fare: trip.fare,
      PaymentMethod: `Online- Card /UPI /Net Banking`,
      Payment_id: di,
      Payment_order_id: order,
      Payment_signature: signature,
      Remark: remarks
    }
    try {
      const response = await axios.post('http://localhost:3001/api/booking/booktrip', data);
      // console.log(response.data.booking)
      navigate('/mybooking')
    } catch (err) {
      if (err.response && err.response.status === 400) {
      alert(err.response.data.message);
    } else {
      console.log(err);
    }
    }
  }
  const initiatePayment = async () => {
   
    const body2 = {
      amount: `${seatsToBook*trip.fare}`,
      currency: "INR",
    };

    try {
      // Make a POST request to your server to create a payment order
      const res = await axios.post(
        "http://localhost:3001/api/payment/create-order",
        body2
      );
      const { orderId, amount } = res.data;

      // Redirect the user to Razorpay payment gateway
      const options = {
        key: "rzp_test_i44QxKNFFcOiCg", // Replace with your Razorpay key ID
        amount: amount,
        currency: "INR",
        name: "Car-Saathi",
        description: "Payment for CarPooling Booking",
        order_id: orderId,
        handler: function (response) {
          console.log(response.razorpay_payment_id);
          console.log(response.razorpay_order_id);
          console.log(response.razorpay_signature);
          bookingConfirm(response.razorpay_payment_id, response.razorpay_order_id, response.razorpay_signature)
        },
        prefill: {
          name: `${user.name}`,
          email: `${user.email}`,
          contact: `${user.phone}`,
        },
        notes: {
          address: "Customer Address",
        },
      };
      const rzp1 = new Razorpay(options);
      // Render the Razorpay component
      rzp1.on("payment.failed", function (response) {
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);

        //! Agar payment failed ho jai to booking delete karna hai 
        //! yaha pe booking delete karna hai

      });

      rzp1.open();
    } catch (error) {
      console.error("Error initiating payment:", error);
    }
  };

  return (
    <div
      className="booking-page"
      style={{
        backgroundImage: `url('https://cdn.pixabay.com/photo/2014/04/27/00/43/traffic-332857_1280.jpg')`,
      }}
    >
      <Navbar user={user} setIsLoggedIn={setIsLoggedIn}/>
      <div className="booking-container">
        <div className="input-group">
          <label htmlFor="seatsToBook">Seats To Book:</label>
          <input
            type="number"
            id="seatsToBook"
            value={seatsToBook}
            onChange={handleSeatsToBookChange}
          />
        </div>
        <div className="input-group">
          <label htmlFor="seatPreference">Seat Preference:</label>
          <select
            id="seatPreference"
            value={seatPreference}
            onChange={handleSeatPreferenceChange}
          >
            <option value="">Select Preference</option>
            <option value="front">Front</option>
            <option value="back">Back</option>
            <option value="middle">Middle</option>
            <option value="rightWindow">Right Side Window</option>
            <option value="leftWindow">Left Side Window</option>
          </select>
        </div>
        <div className="input-group">
          <label htmlFor="remarks">Any Other Remarks:</label>
          <input
            type="text"
            id="remarks"
            value={remarks}
            onChange={handleRemarksChange}
          />
        </div>
        <button className="proceed-payment-btn" onClick={initiatePayment}>
          Proceed to Payment
        </button>
      </div>
    </div>
  );
}

        export default BookingPage;
