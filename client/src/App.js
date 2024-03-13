import Signup from './pages/Signup/Signup.jsx';
import SignIn from './pages/SignIn/SignIn.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './pages/Dashboard/dashboard.jsx';
import Profile from './pages/Profile/Profile.jsx';
// import '@fontsource/roboto/300.css';
// import '@fontsource/roboto/400.css';
// import '@fontsource/roboto/500.css';
// import '@fontsource/roboto/700.css';



function App() {
  return (
    <>
       <BrowserRouter>
        <Routes>

          <Route path="/" element={<SignIn />} />
          <Route path="/SignIn" element={<SignIn/>} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Navbar/>
          <Route path="/profile" element={<Profile/>} />
          
        </Routes>
      </BrowserRouter>   
    </>
    
  );
}

export default App;