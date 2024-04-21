import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/Navbar/Navbar.jsx';
import ReviewCard from '../../components/Review/ReviewCard.jsx';
import Avatar from '@mui/material/Avatar';
import './Profile.css'; // Import your CSS file
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { v4 as uuidv4 } from 'uuid';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: 1,
    boxShadow: 24,
  
    p: 4,
  };

const Profile = ({ user, setUser,setIsLoggedIn }) => {
    const params = useParams();
    const [data, setData] = useState({});
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [rating, setRating] = useState(0);
    const [profileRating, setProfileRating] = useState(0);
    const [comment, setComment] = useState("");
    const [reviews,setReviews] = useState(null)
    const [openSnack, setOpenSnack] = React.useState(false);
   

  const handleClick = () => {
    setOpenSnack(true);
  };

  const handleCloseSnack = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnack(false);
  };
  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleCloseSnack}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );
    console.log(comment)


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
                setProfileRating(res.data.rating);
            } catch (err) {
                console.log(err);
            }
        };

        const getReviews = async()=>{
            try{
                const res = await axios.get(`http://localhost:3001/api/reviews/getReviews/${params.id}`);
                setReviews(res.data.reviews);
            }catch(err){
                console.log(err);
            }
        }

        getUser();
        getRating();
        getReviews();
    }, [params.id]);
    console.log(reviews)
    const handleSubmit = async()=>{
        try{
            const review = {
                _id: uuidv4(),
                Reviewer: user._id,
                ReviewedUser: params.id,
                ReviewerName: user.name,
                Rating: rating,
                Comment: comment,
                Date: new Date()
            }
            console.log(review)
            const res = await axios.post(`http://localhost:3001/api/reviews/addReview/${params.id}`,review);
            console.log(res.data)
            setComment("")
            setRating(0)
            handleClose()
            toast.success("Review added successfully!")
            

        }catch(err){
            console.log(err)
        }
    }


    return (
        <div>
            <Navbar user={user} setIsLoggedIn={setIsLoggedIn}/>
            <div className="profile-container">
                <div className="profile-header">
                    <div className="profile-info">
                        <h1>{data?.username}</h1>
                        <div className="rating">{Math.round(profileRating*100)/100}</div>
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
                      {/* { user._id!=params.id && <button onClick={handleOpen}>Add review</button>} */}
                      <button onClick={handleOpen}>Add review</button>
                        {
                            reviews?.map(review=>{
                                return (
                                    <div className="review-card">
                                       <ReviewCard review={review} setOpenSnack={setOpenSnack}/>
                                    </div>
                                )
                            })
                        }
                        
                    </div>
                </div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                    <Typography component="legend" variant="subtitle1">How is {data.name} as a driver/rider? Leave a review!</Typography>
                    <div className='flex flex-col justify-around'>
                    <Rating
                        name="simple-controlled"
                        value={rating}
                        onChange={(event, newValue) => {
                        setRating(newValue);
                        }}
                        className='mb-4 mt-2'
                        aria-required
                    />
                    <TextField
                        id="outlined-multiline-static"
                        label="Review"
                        multiline
                        rows={4}
                        className='my-2'
                        value={comment}
                        onChange={(e) => {
                        setComment(e.target.value);
                        }}

                    />
                        
                    </div>
                    <div className='flex justify-end mt-4'>
                    <Button variant='outlined' size="large" onClick={handleSubmit}>Add Review</Button>
                    </div>
                    
                    </Box>
                </Modal>
            </div>
        <ToastContainer/>

        <Snackbar
        open={openSnack}
        autoHideDuration={6000}
        action={action}
        onClose={handleClose}
        message="Review deleted successfully"
      />
        </div>
    );
};

export default Profile;
