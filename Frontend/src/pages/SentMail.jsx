import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const SentMail = () => {
    const [mail,setMail]=useState([]);
    
    
      const fetchData=async () => {
        try {
          const token=localStorage.getItem("token");
          const response=await fetch("http://localhost:5000/mail/get/sent",{
            method:"GET",
            headers:{
              "Authorization":token
            }
          })
          const data=await response.json();
          setMail(data.data);
          
        } catch (error) {
          console.log(error);
        }
    
        
      }
      useEffect(()=>{
    
        fetchData()
      },[])

  return (
    <main className="flex-grow bg-white p-4">
    <h2 className="text-xl font-semibold mb-4">Sent Box</h2>
    <div className="border rounded-lg overflow-hidden shadow-md">
      { mail.length > 0 && mail.map((mail) => (
        <Link to={`${mail._id}`} key={mail._id}>
        <div
          
          className="p-3 border-b hover:bg-gray-100 cursor-pointer transition"
        >
          <h3 className="text-lg font-medium">{mail.subject}</h3>
          <p className="text-gray-500 text-sm">Sended To - {mail.to}</p>
        </div>
        </Link>
      )) }
    </div>
  </main>
  )
}

export default SentMail