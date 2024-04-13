<<<<<<< HEAD
        import React, { useState } from 'react';
        import Navbar from '../../components/Navbar/Navbar.jsx';
        import './book.css';
        import axios from 'axios'; // Import Axios for making HTTP requests

        function BookingPage({user, setUser}) {
            const [seatsToBook, setSeatsToBook] = useState('');
            const [seatPreference, setSeatPreference] = useState('');
            const [remarks, setRemarks] = useState('');

            const handleSeatsToBookChange = (e) => {
                setSeatsToBook(e.target.value);
            };

            const handleSeatPreferenceChange = (e) => {
                setSeatPreference(e.target.value);
            };

            const handleRemarksChange = (e) => {
                setRemarks(e.target.value);
            };

            const handleProceedPayment = async () => {
                try {
                    const response = await axios.post('http://localhost:3001/api/payment/createOrder', {
                        amount:10,
                        name: 'Product Name', 
                        description: 'Product Description',
                    });
                    const { success, msg, order_id, amount, key_id, product_name, description, contact, name, email } = response.data;
                    if (success) {
                        // Redirect to payment gateway or handle payment logic
                        window.location.href = `razorpay_payment_url?order_id=${order_id}&amount=${amount}&name=${name}&email=${email}`;
                    } else {
                        console.error(msg);
                    }
                } catch (error) {
                    console.error('Error:', error);
                }
            };

            return (
                <div className="booking-page" style={{ backgroundImage: `url('https://cdn.pixabay.com/photo/2014/04/27/00/43/traffic-332857_1280.jpg')` }}>
                    <Navbar user={user}/>
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
                        <button className="proceed-payment-btn" onClick={handleProceedPayment}>
                            Proceed to Payment
                        </button>
                    </div>
                </div>
            );
        }
=======
import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar.jsx";
import "./book.css";
import axios from "axios";
import useRazorpay from "react-razorpay"; // Import the Razorpay component
import { useLocation } from "react-router-dom";

function BookingPage({ user, setUser }) {
  const [seatsToBook, setSeatsToBook] = useState("");
  const [seatPreference, setSeatPreference] = useState("");
  const [remarks, setRemarks] = useState("");
  const [Razorpay] = useRazorpay();
  const state = useLocation();
  const { trip } = state.state || {};
  useEffect(() => {
    console.log(trip, `trp ki maa ka bhosda`, user);
  },[]);

  const data = {
    Driver: trip.driver,
    Bookingperson: user,
    trip: trip._id,
    NoofBookedSeats: seatsToBook,
    source: trip.source,
    destination: trip.destination,
    Date: trip.time,
    fare: trip.fare,
    PaymentMethod: `Online- Card /UPI /Net Banking`
  }
  const handleSeatsToBookChange = (e) => {
    setSeatsToBook(e.target.value);
  };

  const handleSeatPreferenceChange = (e) => {
    setSeatPreference(e.target.value);
  };

  const handleRemarksChange = (e) => {
    setRemarks(e.target.value);
  };

  const initiatePayment = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/booking/booktrip', data);
      console.log(response.data.message)
      
    } catch (err) {
      if (err.response && err.response.status === 400) {
      alert(err.response.data.message);
    } else {
      console.log(err);
    }
    }
    const body = {
      amount: `${seatsToBook*trip.fare}`,
      currency: "INR",
    };

    try {
      // Make a POST request to your server to create a payment order
      const res = await axios.post(
        "http://localhost:3001/api/payment/create-order",
        body
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

          //! inko bhi handle karna hai baad mein 
          //! maybe transaction history show karne ke liye
        },
        prefill: {
          name: "kritarth",
          email: "customer@example.com",
          contact: "Customer Phone Number",
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
      <Navbar user={user} />
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
>>>>>>> 4e62de2a034e3730340700a5312820564bf4125b

        export default BookingPage;
