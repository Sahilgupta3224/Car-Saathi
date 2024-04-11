import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { FaCar } from "react-icons/fa";
import './Navbar.css';
import { navItems } from './Navitems.jsx';
import Button from './Button.jsx';
import Dropdown from './Dropdown.jsx';


function Navbar({user}) {
    const [dropdown, setDropdown] = useState(false);
    const navigate = useNavigate();
    useEffect(()=>{
    console.log(user)
    }, [user])
    function Logout() {
        localStorage.clear();
        navigate('/Signin');

    }
    return (
        <>
            <nav className="navbar">
                <Link to="/" className="navbar-logo">
                    <FaCar className="car-icon" />
                    <span className="logo-text">Car Saathi</span>
                </Link>
                <ul className="nav-items">
                    {navItems.map(item => {
                        if (item.title === "Services") {
                            return (
                                <li key={item.id} className={item.cName}
                                    onMouseEnter={() => setDropdown(true)}
                                    onMouseLeave={() => setDropdown(false)}>
                                    <Link to={item.path}>{item.title}</Link>
                                    {dropdown && <Dropdown />}
                                </li>
                            )
                        }
                        return (
                            <li key={item.id} className={item.cName}>
                                <Link to={item.path}>{item.title}</Link>
                            </li>
                        );
                    })}{ user._id ?
                     <li className="nav-item" onClick={Logout}>
                        <div className="inside font-light text-white hover:cursor-pointer">Logout</div>
                    </li> : <li className="nav-item" onClick={Logout}>
                        <div className="inside font-light text-white hover:cursor-pointer">Login</div>
                    </li>}
                </ul>

                <Button />
            </nav>
        </>
    );
}

export default Navbar;
