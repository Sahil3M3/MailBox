import React, { useEffect, useState } from "react";
import Header from "./Header";
import { FaInbox, FaStar, FaPaperPlane, FaTrash, FaEdit } from "react-icons/fa";
import ComposeMail from "./ComposeMail";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";



const Mailbox = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const auth=useSelector(state=>state.auth.token);

  const navigation=useNavigate();
                            
       useEffect(()=>{
        if(!auth){
         navigation("/")
   }
       },[auth,navigation])
  
  return (
    <div className="h-screen flex flex-col">
      <Header /> 

      {/* Body */}
      <div className="flex flex-grow">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-100 p-4 shadow-lg">
          <button onClick={()=>setIsModalOpen(true)}  className="bg-[#6001D3] text-white w-full py-2 mb-4 flex items-center justify-center rounded-lg hover:bg-[#4A0096] transition">
            <FaEdit className="mr-2" /> Compose
          </button>
          <ul className="space-y-2">
          <Link to={"/inbox"}>
            <li className="flex items-center p-2 hover:bg-gray-200 rounded-lg cursor-pointer">
              <FaInbox className="mr-2" /> Inbox
            </li>
            </Link>
            <Link to={"/inbox/sent"}>
            <li className="flex items-center p-2 hover:bg-gray-200 rounded-lg cursor-pointer">
              <FaPaperPlane className="mr-2" /> Sent
            </li>
            </Link>
            <li className="flex items-center p-2 hover:bg-gray-200 rounded-lg cursor-pointer">
              <FaTrash className="mr-2" /> Trash
            </li>
          </ul>
        </aside>
      <Outlet/>
      </div>
      {isModalOpen && <ComposeMail onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default Mailbox;
