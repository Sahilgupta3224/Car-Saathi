import React, { useState } from "react";
import { ServiceDropdown } from "./Navitems.jsx";
import { Link } from "react-router-dom";
import "./Dropdown.css";

function Dropdown() {
  const [Dropdown, setDropdown] = useState(false);

  return (
    <>
      <ul
        className={Dropdown? "services-submenu clicked" : "services-submenu"}
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