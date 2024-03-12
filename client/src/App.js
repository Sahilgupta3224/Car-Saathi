import Signup from './pages/Signup/Signup.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';



function App() {
  return (
  
      <>
       <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signup/>} />
          <Route path="/Signup" element={<Signup/>} />
          
        </Routes>
      </BrowserRouter>   
    </>
    
  );
}

export default App;
