import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 1,
  boxShadow: 24,

  p: 4,
};

const BookCard = ({ booking ,onDelete,driverid,name,phone,setCurrentChat,currentChat}) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [refundopen, setRefundOpen] = useState(false);
  const handleRefundOpen = () => setRefundOpen(true);
  const handleRefundClose = () => {
    setRefundOpen(false)
    handleClose()
    handleDelete()
  };

  const [per, setRefundPercentage] = useState(1);
  const [refund, setRefund] = useState(booking.fare * per);
  useEffect(() => {
    const today = new Date();
    const bookingDate = new Date(booking.Date);

    // Calculate the difference in days between today and the booking date
    const differenceInTime = bookingDate.getTime() - today.getTime();
    const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
    console.log(booking.Date);
    // Set the refund percentage based on the difference in days
    if (differenceInDays >= 2) {
      setRefundPercentage(0.95);
    } else if (differenceInDays === 1) {
      setRefundPercentage(0.45);
    } else if (differenceInDays <= 0) {
      setRefundPercentage(0);
    }
    setRefund(booking.fare * per);
  });

  const today = new Date();
  const bookDate = new Date(booking.Date);
  const textColorClass = bookDate < today ? "text-red-900" : "text-green-900";
  const navigate = useNavigate();
  console.log(driverid);

  const handleMessageClick = () => {
    const getConversation = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3001/api/conversation/getConversation/" +
            booking.Bookingperson
        );
        let conversations = res.data;
        // console.log(conversations)

        // Find if conversation with the driver already exists
        let chatExists = conversations?.find((conversation) =>
          conversation.members.includes(booking.Driver)
        );
        //console.log(chatExists)

        if (chatExists) {
          setCurrentChat(chatExists);
          if (currentChat) {
            navigate("/messenger");
          }
        } else {
          const res = await axios.post(
            "http://localhost:3001/api/conversation/",
            { senderId: booking.Bookingperson, receiverId: booking.Driver }
          );
          console.log(res.data);
          setCurrentChat(res.data);
          navigate("/messenger");
        }
      } catch (err) {
        console.log(err);
      }
    };
    getConversation();
  };

  const userprofile = () => {
    navigate(`/profile/${driverid}`);
  };

  const handleDelete = async()=>{
    try{
      await onDelete(booking._id);
      toast.success("Booking removed successfully!")
      handleClose()
    }catch(err){
      console.log(err);
    }
  };

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
          <p>
            Date of travelling:{" "}
            {new Date(booking.Date).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>
      </div>
      {/* {textColorClass === "text-green-900" ? ( */}
      <div className="flex justify-end">
        <button
          className="bg-red-500 text-white rounded-md px-4 py-2 mr-2 hover:bg-red-600"
          onClick={handleOpen}
        >
          Delete Trip
        </button>
        <button
          className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600"
          onClick={handleMessageClick}
        >
          Message Driver
        </button>
      </div>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className="text-lg">
              Are you sure you want to cancel / delete the booking?
            </div>
            <div className="flex justify-between mt-4">
              <Button
                variant="outlined"
                color="success"
                size="large"
                onClick={handleRefundOpen}
              >
                YES
              </Button>
              <Button
                variant="outlined"
                color="error"
                size="large"
                onClick={handleClose}
              >
                NO
              </Button>
            </div>
          </Box>
        </Modal>
        <Modal
          open={refundopen}
          onClose={handleRefundClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className="max-w-lg mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-4">
                Cancellation Policy
              </h2>
              <ul className="list-disc pl-6">
                <li className="mb-2">
                  Cancellation made 2 or more days in advance: Full refund of
                  the booking amount.
                </li>
                <li className="mb-2">
                  Cancellation made 1 day in advance: 50% refund of the booking
                  amount.
                </li>
                <li className="mb-2">
                  Cancellation made on the same day: No refund will be provided.
                </li>
              </ul>
              <p className="text-sm mt-4">
                Please note that the refund processing times may vary depending
                on your payment method and financial institution.
              </p>
              <p className="text-sm mt-4">
                For any questions or assistance regarding cancellations, please
                contact our customer support team.
                By clicking yes, you agree to the cancellation policy.
              </p>
              <p className="text-sm mt-4">
                {`Your refund amount is ${refund}`}
              </p>
            </div>
            <div className="flex justify-between mt-4">
              <Button
                variant="outlined"
                color="success"
                size="large"
                onClick={handleRefundClose}
              >
                YES
              </Button>
              <Button
                variant="outlined"
                color="error"
                size="large"
                onClick={handleRefundClose}
              >
                Cancel
              </Button>
            </div>
          </Box>
        </Modal>
        <ToastContainer draggablePercent={60} autoClose={false} />
      </div>
    </div>
  );
};
export default BookCard;
