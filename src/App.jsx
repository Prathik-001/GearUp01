import React from "react"
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar/nav.jsx";
import './components/Navbar/nav.css';
import './components/Body/body.css';

const App =()=> {
    return (
    <div className='App'>
      <Navbar />
        <Outlet />
    </div>
    );
  };
  
  export default App
