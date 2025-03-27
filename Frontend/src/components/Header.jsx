import React from "react";
import { useSelector } from "react-redux";

const Header = () => {
  const unread=useSelector(state=>state.mail.unread)


  return (
    <header className="bg-[#6001D3] text-white flex items-center justify-between p-4 shadow-lg">
      <h1 className="text-2xl font-bold">My Mailbox</h1>
      <div className="relative w-1/3">
       <span className="bg-black-500 ">Unread Mails {unread}</span>
      </div>
    </header>
  );
};

export default Header;
