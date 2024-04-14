import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaCar } from "react-icons/fa";
import { RiLogoutBoxLine, RiUserLine } from "react-icons/ri"; // Using modern icons
import { navItems } from "./Navitems.jsx";
import Button from "./Button.jsx";
import Dropdown from "./Dropdown.jsx";

function Navbar({ user }) {
  const [dropdown, setDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(user);
  }, [user]);

  function Logout() {
    localStorage.clear();
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
                onMouseEnter={() => setDropdown(true)}
                onMouseLeave={() => setDropdown(false)}
              >
                <Link to={item.path}>{item.title}</Link>
                {dropdown && <Dropdown />}
              </li>
            );
          }
          return (
            <>
            <li key={item.id} className="relative text-white hover:text-yellow-400 cursor-pointer">
              <Link to={item.path}>{item.title}</Link>
            </li>
            </>
          );
        })}
      </ul>
      
      <div className="flex items-center space-x-4 ml-auto">
        <Button/>
        {user._id ? (
          <div className="flex space-x-6 ">
            <div className="text-white cursor-pointer hover:text-yellow-400 flex items-center justify-center" onClick={profile}>
              <RiUserLine className="text-3xl mr-1" />
              <span>Profile</span>
            </div>
            <div className="text-white cursor-pointer hover:text-yellow-400 flex items-center justify-center" onClick={Logout}>
              <RiLogoutBoxLine className="text-3xl mr-1" />
              <span>Logout</span>
            </div>
          </div>
        ) : (
          <div className="text-white cursor-pointer hover:text-yellow-400 flex items-center justify-center" onClick={Logout}>
            <RiUserLine className="text-3xl mr-1" />
            <span>Login</span>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
