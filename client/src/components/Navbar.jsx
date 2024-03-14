import React from 'react'
import { Link } from "react-router-dom";
import * as Icons from "react-icons/fa"; 
import "./Navbar.css";
import { navItems } from './Navitem';
import Button from './Button';

const Navbar = () => {
    return (
        <>
            <nav className="navbar">
                <Link to="/" className="navbar-logo">
                    CAR POOL
                    <Icons.FaTree />
                </Link>
                <ul className="nav-items">
                    {navItems.map(item => {
                        return (
                            <li key={item.id} className={item.cName}>
                                <Link to={item.path}>{item.title}</Link>
                            </li>
                        );
                    })}
                </ul>
                <button></button>
            </nav>
        </>
    );
}

export default Navbar;
