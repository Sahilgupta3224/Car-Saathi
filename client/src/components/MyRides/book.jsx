import React, { useEffect, useState } from 'react';
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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

const BookCard = ({ booking ,onDelete,driverid,name,phone,setCurrentChat,currentChat}) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const today = new Date();
  const bookDate = new Date(booking.Date);
  const textColorClass = bookDate < today ? 'text-red-900' : 'text-green-900';
  const navigate = useNavigate()
  console.log(driverid);

  const handleMessageClick = ()=>{
      const getConversation = async()=>{
          try{
              const res= await axios.get("http://localhost:3001/api/conversation/getConversation/" + booking.Bookingperson);
              let conversations = res.data 
              // console.log(conversations)

              // Find if conversation with the driver already exists
              let chatExists = conversations?.find(conversation => conversation.members.includes(booking.Driver));
              //console.log(chatExists)
              
              if(chatExists){
                  setCurrentChat(chatExists)  
                  if (currentChat) {
                    navigate("/messenger");
                  }
              }else{
               const res= await axios.post("http://localhost:3001/api/conversation/",{senderId:booking.Bookingperson,receiverId:booking.Driver});
               console.log(res.data)
               setCurrentChat(res.data)
               navigate("/messenger");
              }
          }catch(err){
             console.log(err)
          }
      }
      getConversation()
  }

  const userprofile=()=>{
    navigate(`/profile/${driverid}`)
  }

  const handleDelete = async()=>{
    try{
      await onDelete(booking._id);
      toast.success("Booking removed successfully!")
      handleClose()
    }catch(err){
      console.log(err);
    }
  }

    return (
  <div
  className={` border border-gray-300 rounded-md p-4 transition-transform duration-500 ease-in-out transform hover:scale-105 ${textColorClass} ${
    textColorClass === "text-green-900" ? "bg-green-200" : "bg-red-200"
  }`}
  >
    <div className="flex justify-between items-center mb-4">
      <div>
        <p>Source: {booking.source}</p>
        <p>Destination: {booking.destination}</p>
      </div>
      <p>Fare: {booking.fare}</p>
    </div>
    <div className="flex justify-between items-center mb-4">
      <div>
        <p>Seats: {booking.NoofBookedSeats}</p>
        <button onClick={() => userprofile()}>
  <FontAwesomeIcon icon={faUser} className="mr-2" />
   Driver's Profile
</button>
      </div>
      <div>
        <p>Driver's Name: {name}</p>
        <p>Date of travelling: {new Date(booking.Date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
      </div>
    </div>
    {/* {textColorClass === "text-green-900" ? ( */}
        <div className="flex justify-end">
          <button className="bg-red-500 text-white rounded-md px-4 py-2 mr-2 hover:bg-red-600" onClick={handleOpen}>
            Delete Booking
          </button>
          <button className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600" onClick={handleMessageClick}>
            Message Driver
          </button>
        </div>
      {/* ) : ( */}
        {/* <div></div> */}
      {/* )} */}
      {/* <DeleteModal/> */}
      <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className='text-lg'>Are you sure you want to cancel / delete the booking?</div>
          <div className='flex justify-between mt-4'>
          <Button variant="outlined" color="success" size="large" onClick={handleDelete}>YES</Button>
          <Button variant='outlined' color="error" size="large" onClick={handleClose}>NO</Button>
          </div>
          
        </Box>
      </Modal>
      <ToastContainer draggablePercent={60} autoClose={false}/>
    </div>
  </div>
);
};
export default BookCard;