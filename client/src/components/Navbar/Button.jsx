import React from "react";
import { Link } from "react-router-dom";
import "./Button.css";
import { CiInboxIn } from "react-icons/ci";
import { FaInbox } from 'react-icons/fa';
import { RiLogoutBoxLine, RiUserLine, RiInboxLine} from "react-icons/ri"; 

function Button() {
  return (
    <div  className="text-white cursor-pointer hover:text-yellow-400 flex items-center justify-center">
    <Link to="/inbox" className="flex gap-2">
    <RiInboxLine className="text-3xl font-bold"/>
      <button className="relative"></button>
    </Link>
    </div>
  );
}

export default Button;