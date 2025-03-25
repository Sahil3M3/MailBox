import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";

const MessageDetails = () => {
  const { id } = useParams(); 
  const location=useLocation();
  const path=location.pathname
  const isSentTrue=!path.includes("sent");
  
  const [message, setMessage] = useState(null);  
  
  useEffect(() => {
    const fetchMessage = async () => {
        const token=localStorage.getItem("token")
        
        
      try {
        const res = await axios.put(
          `http://localhost:5000/mail/messages/${id}`, 
          { isSentTrue }, // Request body
          {
            headers: {
              Authorization: token,
              "Content-Type": "application/json"
            }
          }
        );
       
          setMessage(res.data.data);
      } catch (error) {
        console.error("Error fetching message:", error);
      }
    };

    fetchMessage();
  }, [id]);

  if (!message) return <p className="p-4">Loading message...</p>;

  return (
    <div className="p-6 flex flex-col">
      <h2 className="text-2xl font-semibold mb-2">{message.subject}</h2>
      <p className="text-gray-600 mb-4">From: {message.from}</p>
      <p className="text-gray-600 mb-4">To: {message.to}</p>
      <div className="border p-4 rounded-lg shadow bg-white">{message.message}</div>
    </div>
  );
};

export default MessageDetails;
