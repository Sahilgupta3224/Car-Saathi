import React from 'react';
import Navbar from '../../components/Navbar/Navbar.jsx'
import Button from './Button.jsx';
import './DriverInfoPage.css'; 

function DriverInfoPage({user}) {
    return (
        <div>
            <Navbar user={user} /> 
            <div className="driver-info-container">
                <div className="driver-info-box">
                    <div className="driver-photo">
                        <img src="driver-photo.jpg" alt="Driver's Photo" className="photo" />
                    </div>
                    <div className="driver-details">
                        <h2>Driver Information</h2>
                        <p>Name: Sahil Gupta</p>
                        <p>Age: 24</p>
                        <p>License Number: HAI HI NAW</p>
                    </div>
                    <div className="contact-info">
                        <h2>Contact Information</h2>
                        <p>Phone Number: +91 634242**</p>
                    </div>
                    <div className="journey-info">
                        <h2>Journey Details</h2>
                        <p>Source City: Bombay</p>
                        <p>Destination City: Kashmir</p>
                        <p>Seats Available: 3</p>
                    </div>
                </div>
            </div>
            <Button />
        </div>
    );
}

export default DriverInfoPage;
