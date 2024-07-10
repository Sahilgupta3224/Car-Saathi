import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaCar } from "react-icons/fa";
import { RiLogoutBoxLine, RiUserLine } from "react-icons/ri"; // Using modern icons
import { navItems } from "./Navitems.jsx";
import Button from "./Button.jsx";
import Dropdown from "./Dropdown.jsx";
import { Tooltip } from "@mui/material";

function Navbar({ user,setIsLoggedIn }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  // const [dropdown, setDropdown] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    console.log(user);
  }, [user]);

  function Logout() {
    localStorage.clear();
    setIsLoggedIn(false)
    navigate("/Signin");
  }

  function profile() {
    navigate(`/profile/${user._id}`);
  }

  return (
    <nav className="bg-gray-900 p-4 flex justify-between items-center">
      <Link to="/" className="flex items-center text-white text-xl font-bold">
        <FaCar className="text-yellow-400 mr-2"/>
        <span className="logo-text">Car Saathi</span>
      </Link>
      <div className="w-[#80vw] bg-slate-500 text-center mr-72"></div>
      <ul className="flex justify-end space-x-10 flex-grow w-20 pr-12">
        {navItems.map((item) => {
          if (item.title === "Services") {
            return (
              <li
                key={item.id}
                className="relative text-white hover:text-yellow-400 cursor-pointer"
                onClick={handleDropdownToggle}
              >
                <p>Services</p>
                {isDropdownOpen&& <Dropdown ref={dropdownRef} />}
              </li>
            );
          }
          else{
            return (
              <>
              <li key={item.id} className="relative text-white hover:text-yellow-400 cursor-pointer">
                <Link to={item.path}>{item.title}</Link>
              </li>
              </>
            );
          }
        })}
      </ul>
      
      <div className="flex items-center space-x-4 ml-auto">
        {user._id ? (
          <div className="flex ">
            <Button/>
            <div className="text-white cursor-pointer hover:text-yellow-400 flex items-center justify-center" onClick={profile}>
            <Tooltip title="Profile"> <RiUserLine className="text-2xl mr-3" /></Tooltip>
              {/* <span>Profile</span> */}
            </div>
            <div className="text-white cursor-pointer hover:text-yellow-400 flex items-center justify-center" onClick={Logout}>
            <Tooltip title="Logout"> <RiLogoutBoxLine className="text-2xl mr-3" /></Tooltip>
              {/* <span>Logout</span> */}
            </div>
          </div>
        ) : (
          <div className="text-white cursor-pointer hover:text-yellow-400 flex items-center justify-center" onClick={navigate("/Signin")}>
            <RiUserLine className="text-3xl mr-3" />
            <span>Login</span>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
