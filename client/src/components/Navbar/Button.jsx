import React from "react";
import { Link } from "react-router-dom";
import "./Button.css";

function Button() {
  return (
    <Link to="/createtrip">
      <button className="relative text-white hover:text-yellow-400 cursor-pointer">Add Ride</button>
    </Link>
  );
}

export default Button;