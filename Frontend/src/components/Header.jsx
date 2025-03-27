import React from "react";

const Header = () => {

  return (
    <header className="bg-[#6001D3] text-white flex items-center justify-between p-4 shadow-lg">
      <h1 className="text-2xl font-bold">My Mailbox</h1>
      <div className="relative w-1/3">
       <span className="bg-black-500 ">Total Mail</span>
      </div>
    </header>
  );
};

export default Header;
