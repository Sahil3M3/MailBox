import React, { useEffect, useState } from "react";
import Header from "./Header";
import { FaInbox, FaStar, FaPaperPlane, FaTrash, FaEdit } from "react-icons/fa";
import ComposeMail from "./ComposeMail";


const Mailbox = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mail,setMail]=useState([]);


  const fetchData=async () => {
    try {
      const token=localStorage.getItem("token");
      const response=await fetch("http://localhost:5000/mail/get",{
        method:"GET",
        headers:{
          "Authorization":token
        }
      })
      const data=await response.json();
      console.log(data);
      
    } catch (error) {
      console.log(error);
    }

    
  }
  useEffect(()=>{

    fetchData()
  },[])

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
            <li className="flex items-center p-2 hover:bg-gray-200 rounded-lg cursor-pointer">
              <FaInbox className="mr-2" /> Inbox
            </li>
            <li className="flex items-center p-2 hover:bg-gray-200 rounded-lg cursor-pointer">
              <FaStar className="mr-2" /> Starred
            </li>
            <li className="flex items-center p-2 hover:bg-gray-200 rounded-lg cursor-pointer">
              <FaPaperPlane className="mr-2" /> Sent
            </li>
            <li className="flex items-center p-2 hover:bg-gray-200 rounded-lg cursor-pointer">
              <FaTrash className="mr-2" /> Trash
            </li>
          </ul>
        </aside>

        {/* Mail List */}
        <main className="flex-grow bg-white p-4">
          <h2 className="text-xl font-semibold mb-4">Inbox</h2>
          <div className="border rounded-lg overflow-hidden shadow-md">
            {/* Sample Mails */}
            { mail.length>  ["Welcome to your Mail", "Job Opportunity", "Meeting Reminder"].map((mail, index) => (
              <div
                key={index}
                className="p-3 border-b hover:bg-gray-100 cursor-pointer transition"
              >
                <h3 className="text-lg font-medium">{mail}</h3>
                <p className="text-gray-500 text-sm">Sender Name - 5 mins ago</p>
              </div>
            )) }
          </div>
        </main>
      </div>
      {isModalOpen && <ComposeMail onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default Mailbox;
