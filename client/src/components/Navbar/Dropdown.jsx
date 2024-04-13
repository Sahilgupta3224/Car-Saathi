import React, { useState } from "react";
import { ServiceDropdown } from "./Navitems.jsx";
import { Link } from "react-router-dom";
import "./Dropdown.css";

function Dropdown() {
  const [Dropdown, setDropdown] = useState(false);

  const dropdownStyles = {
  position: 'absolute',
  top: '100%',
  left: '0',
  zIndex: '999', // Add this line
  backgroundColor: '#fff',
  padding: '10px 0',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  listStyle: 'none',
  margin: '0',
};

  return (
    <>
      <ul
        className={Dropdown? "services-submenu clicked" : "services-submenu"}
        style={Dropdown? dropdownStyles : {}}
        onClick={() => setDropdown(!Dropdown)}
      >
        {ServiceDropdown.map((item) => {
          return (
            <li key={item.id}>
              <Link
                to={item.path}
                className={item.cName}
                onClick={() => setDropdown(false)}
              >
                {item.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default Dropdown;