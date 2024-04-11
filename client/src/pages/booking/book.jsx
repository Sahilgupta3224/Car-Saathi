import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar.jsx';
import './book.css';

function BookingPage() {
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

    const handleProceedPayment = () => {
        // Implement payment handling logic here
    };

    return (
        <div className="booking-page" style={{ backgroundImage: `url('https://cdn.pixabay.com/photo/2014/04/27/00/43/traffic-332857_1280.jpg')` }}>
            <Navbar />
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
