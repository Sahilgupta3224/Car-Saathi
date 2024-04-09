import React from "react";
import { Link } from "react-router-dom";
import "./Button.css";

function Button() {
  return (
    <Link to="/createtrip">
      <button className="btn">Add Ride</button>
    </Link>
  );
}

export default Button;