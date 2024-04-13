import Signup from './pages/Signup/Signup.jsx';
import SignIn from './pages/SignIn/SignIn.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import Profile from './pages/Profile/Profile.jsx';
import BookingInfo from './pages/BookingInfo/Info.jsx';
import BookingPage from './pages/booking/book.jsx';
<<<<<<< HEAD
// import Trip from './pages/Trips/trips.jsx';
=======
>>>>>>> 4e62de2a034e3730340700a5312820564bf4125b
import { useState } from 'react';
import { Messenger } from './pages/Messenger/Messenger.jsx';
import Search from './pages/Search-Car-Sharing/Search.jsx';
import PublishTrip from './pages/PublishTrip/PublishTrip.jsx';
import Payment from './pages/Payment/Payment.jsx';
import PaymentSuccess from './pages/Payment/PaymentSuccess.jsx';

function App() {
  const [user,setUser] = useState({});

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
          <Route path="/messenger" element={<Messenger user={user} setUser={setUser}/>}></Route>
<<<<<<< HEAD
          {/* <Route path="/trips" element={<Trip user={user} setUser={setUser}/>}/> */}
          <Route path="/createtrip" element={<PublishTrip user={user} setUser={setUser}/>}/>
          <Route path='/search' element={<Search user={user} />}/>
          <Route path='/Payment' element={<Payment user={user} setUser={setUser} />} />
           <Route path="/paymentsuccess" element={<PaymentSuccess />} />
=======
          <Route path="/createtrip" element={<PublishTrip user={user} setUser={setUser}/>}/>
          <Route path='/search'  element={<Search user={user}  />}/>
          <Route path='/Payment' element= {<Payment user = {user} setUser = {setUser}/>}/>
>>>>>>> 4e62de2a034e3730340700a5312820564bf4125b
        </Routes>
      </BrowserRouter>
    </> 
  );
}

export default App;