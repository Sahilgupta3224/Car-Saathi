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

        export default BookingPage;
