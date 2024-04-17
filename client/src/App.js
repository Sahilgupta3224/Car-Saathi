import Signup from './pages/Signup/Signup.jsx';
import SignIn from './pages/SignIn/SignIn.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import Profile from './pages/Profile/Profile.jsx';
import BookingInfo from './pages/BookingInfo/Info.jsx';
import BookingPage from './pages/booking/book.jsx';
import { useState , useEffect} from 'react';
import { Messenger } from './pages/Messenger/Messenger.jsx';
import Search from './pages/Search-Car-Sharing/Search.jsx';
import PublishTrip from './pages/PublishTrip/PublishTrip.jsx';
import Rider from './pages/Rides/Rider/Rider.jsx';
import DriverRides from './pages/Rides/Driver/DriverRides.jsx';
import ResetPassword from './pages/Reset/Reset.jsx';
import { ContactUs } from './pages/ContactUs/contact.jsx';
import Inbox from './pages/Inbox/Inbox.jsx';

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || {});
  const [currentChat,setCurrentChat] = useState(null)


  // Update localStorage when user state changes
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);
  return (
    <>
       <BrowserRouter>
        <Routes>
          <Route path="/SignIn" element={<SignIn user={user} setUser={setUser}/>}/>
          <Route path="/Signup" element={<Signup user={user} setUser={setUser}/>}/>
          <Route path="/" element={<Dashboard user={user} setUser={setUser}/>}/>
          <Route path="/profile/:id" element={<Profile user={user} setUser={setUser} />} />
          <Route path="/BookingInfo" element={<BookingInfo user={user} setUser={setUser} />} /> 
          <Route path="/booking" element={<BookingPage user={user} setUser={setUser} />} /> 
          <Route path="/messenger" element={<Messenger user={user} setUser={setUser} currentChat={currentChat} setCurrentChat={setCurrentChat}/>}></Route>
          <Route path="/createtrip" element={<PublishTrip user={user} setUser={setUser}/>}/>
          <Route path='/search' element={<Search user={user} />}/>
          <Route path="/mybooking" element={<Rider user={user} setCurrentChat={setCurrentChat} currentChat={currentChat}/>} />
          <Route path="/myrides" element={<DriverRides user={user}/>} />
          <Route path='/resetPassword' element={<ResetPassword />}/>
          <Route path="/contactus" element={<ContactUs user={user} />} />
          <Route path="/inbox" element={<Inbox user={user} setUser={setUser}/>} />
          <Route path="*" element={<p>ERROR 404</p>}/>
        </Routes>
      </BrowserRouter>
    </> 
  );
}

export default App;