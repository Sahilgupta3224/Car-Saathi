import logo from './logo.svg';
import Signup from './pages/Signup/Signup.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

function App() {
  return (
  
      <>
       <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signup/>} />
        </Routes>
      </BrowserRouter>   
    </>
    
  );
}

export default App;
