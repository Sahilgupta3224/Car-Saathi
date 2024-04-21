import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import axios from "axios";

const Inbox = ({ user, setUser,setIsLoggedIn }) => {
  const [notifications, setNotifications] = useState([]);
  const [inboxuser, setInboxUser] = useState({});
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const getBookings = async () => {
        try{
          const data = { userId: user._id }; // Pass user ID as an object with userId property
    console.log(user._id);
    const response = await axios.post('http://localhost:3001/api/notifications/booknotify', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
          console.log('response is send')
          console.log(response.data);
        }catch(err){
          console.log(err)
        }
      }
    getBookings();
  }, []);

  useEffect(()=>{
    const getNotifications = async()=>{
      try{
        const res = await axios.get(`http://localhost:3001/api/notifications/getnotifications/${user._id}`)
        console.log(res.data.notifications);
        setNotifications(res.data.notifications)
      }
      catch(e){
        console.log(e);
      }
    }
    getNotifications() 
  },[])
  console.log(notifications)

  return (
    <div className='dark:bg-[#181818] min-h-screen'>
      <Navbar user={user} setUser={setUser} setIsLoggedIn={setIsLoggedIn} />
      <div className='font-extrabold text-5xl mx-4 mt-4 underline underline-offset-8 text-[#8656cd] dark:text-[#f0f0f0]'>Inbox</div>
      <div className="mt-8 mx-4">
        {notifications.length > 0 ? (
          notifications.map((notification, index) => (
            <div key={index} className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded-md mb-2">
              <span className="font-bold">New booking:</span> {notification.content}
            </div>
          ))
        ) : (
          <div className="bg-gray-100 border border-gray-400 text-gray-700 px-4 py-2 rounded-md">No new bookings today</div>
        )}
      </div>
    </div>
  );
};

export default Inbox;
