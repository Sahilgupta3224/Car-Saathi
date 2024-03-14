import Signup from './pages/Signup/Signup.jsx';
import SignIn from './pages/SignIn/SignIn.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import Profile from './pages/Profile/Profile.jsx';
import { useState } from 'react';
import { Messenger } from './pages/Messenger/Messenger.jsx';
// import '@fontsource/roboto/300.css';
// import '@fontsource/roboto/400.css';
// import '@fontsource/roboto/500.css';
// import '@fontsource/roboto/700.css';

function App() {
  const [user,setUser] = useState({});

  return (
    <>
       <BrowserRouter>
        <Routes>

          <Route path="/" element={<SignIn />} />
          <Route path="/SignIn" element={<SignIn user={user} setUser={setUser}/>}/>
          <Route path="/Signup" element={<Signup user={user} setUser={setUser}/>}/>
          <Route path="/Dashboard" element={<Dashboard user={user} setUser={setUser}/>}/>
          <Route path="/profile/:id" element={<Profile user={user} setUser={setUser}/>}/>
          <Route path="/messenger" element={<Messenger user={user} setUser={setUser}/>}></Route>
          
        </Routes>
      </BrowserRouter>   
    </>
    
  );
}

export default App;