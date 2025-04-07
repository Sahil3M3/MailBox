import React, { useEffect, useState } from "react";
import Header from "./Header";
import { FaInbox, FaPaperPlane, FaEdit, FaBars, FaTimes } from "react-icons/fa";
import ComposeMail from "./ComposeMail";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Mailbox = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const auth = useSelector((state) => state.auth.token);

  const navigation = useNavigate();

  useEffect(() => {
    if (!auth) {
      navigation("/");
    }
  }, [auth, navigation]);

  return (
    <div className="h-screen flex flex-col">
      <Header />

      {/* Mobile Sidebar Toggle */}
      <div className="sm:hidden flex justify-between items-center px-4 py-2 bg-gray-100 shadow-md">
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-xl">
          {isSidebarOpen ? <FaTimes /> : <FaBars />}
        </button>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#6001D3] text-white px-4 py-2 rounded-lg"
        >
          <FaEdit className="inline mr-1" /> Compose
        </button>
      </div>

      {/* Body */}
      <div className="flex flex-grow overflow-hidden">
        {/* Sidebar (Mobile: conditional, Desktop: always visible) */}
        <aside
          className={`bg-gray-100 shadow-lg p-4 z-10 sm:static absolute h-full sm:h-auto w-64 transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full sm:translate-x-0"}`}
        >
          <button
            onClick={() => setIsModalOpen(true)}
            className="hidden sm:flex bg-[#6001D3] text-white w-full py-2 mb-4 items-center justify-center rounded-lg hover:bg-[#4A0096] transition"
          >
            <FaEdit className="mr-2" /> Compose
          </button>

          <ul className="space-y-2">
            <Link to={"/inbox"} onClick={() => setIsSidebarOpen(false)}>
              <li className="flex items-center p-2 hover:bg-gray-200 rounded-lg cursor-pointer">
                <FaInbox className="mr-2" /> Inbox
              </li>
            </Link>
            <Link to={"/inbox/sent"} onClick={() => setIsSidebarOpen(false)}>
              <li className="flex items-center p-2 hover:bg-gray-200 rounded-lg cursor-pointer">
                <FaPaperPlane className="mr-2" /> Sent
              </li>
            </Link>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="flex-grow overflow-y-auto">
          <Outlet />
        </main>
      </div>

      {isModalOpen && <ComposeMail onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default Mailbox;
