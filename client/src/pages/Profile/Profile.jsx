import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/Navbar/Navbar.jsx';
import ReviewCard from '../../components/Review/ReviewCard.jsx';
import Avatar from '@mui/material/Avatar';
import './Profile.css'; // Import your CSS file

const Profile = ({ user, setUser }) => {
    const params = useParams();
    const [data, setData] = useState({});
    const [rating, setRating] = useState(null);
    console.log(user)
    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await axios.get(`http://localhost:3001/api/user/getUser/${params.id}`);
                setData(res.data.user);
                console.log(res.data.user)
            } catch (err) {
                console.log(err);
            }
        };

        const getRating = async () => {
            try {
                const res = await axios.get(`http://localhost:3001/api/reviews/getRating/${params.id}`);
                setRating(res.data.rating);
            } catch (err) {
                console.log(err);
            }
        };

        getUser();
        getRating();
    }, [params.id]);

    return (
        <div>
            <Navbar user={user} />
            <div className="profile-container">
                <div className="profile-header">
                    <div className="profile-info">
                        <h1>{data?.username}</h1>
                        <div className="rating">{!rating ? "-" : rating}</div>
                    </div>
                    <Avatar src="/broken-image.jpg" className="avatar" />
                </div>
                <div className="separator"></div>
                <div className="profile-details">
                    <div className="about-section">
                        <h2>About</h2>
                        <div>EMAIL: {data?.email}</div>
                    </div>
                    <div className="separator"></div>
                    <div className="reviews-section">
                        <h2>Reviews</h2>
                        <div className="review-card">
                            <ReviewCard />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
