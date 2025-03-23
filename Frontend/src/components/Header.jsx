import React from "react";
import { FaSearch } from "react-icons/fa";

const Header = () => {

  return (
    <header className="bg-[#6001D3] text-white flex items-center justify-between p-4 shadow-lg">
      <h1 className="text-2xl font-bold">My Mailbox</h1>
      <div className="relative w-1/3">
        <input
          type="text"
          placeholder="Search mail..."
          className="w-full p-2 pl-10 rounded-lg bg-white text-black focus:outline-none"
        />
        <FaSearch className="absolute top-3 left-3 text-gray-500" />
      </div>
    </header>
  );
};

export default Header;
