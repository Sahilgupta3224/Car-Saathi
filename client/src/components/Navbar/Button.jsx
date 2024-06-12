import React from "react";
import { Link } from "react-router-dom";
import "./Button.css";
import { CiInboxIn } from "react-icons/ci";
import { FaInbox } from 'react-icons/fa';
import { RiLogoutBoxLine, RiUserLine, RiInboxLine} from "react-icons/ri"; 
import { Tooltip } from "@mui/material";

function Button() {
  return (
    <div  className="text-white cursor-pointer hover:text-yellow-400 flex items-center justify-center">
    <Link to="/inbox" className="flex mr-3">
    {/* <FaInbox className="text-3xl font-bold"/> */}
      <Tooltip title="Inbox"><button className="relative text-2xl">✉</button></Tooltip>
    </Link>
    </div>
  );
}

export default Button;