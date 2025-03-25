import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Inbox = () => {
  const [mail, setMail] = useState([]);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/mail/get", {
        method: "GET",
        headers: {
          "Authorization": token
        }
      });
      const data = await response.json();
      console.log(data);
      
      setMail(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className="flex-grow bg-white p-4">
      <h2 className="text-xl font-semibold mb-4">Inbox</h2>
      <div className="border rounded-lg overflow-hidden shadow-md">
        {mail.length > 0 && mail.map((mail) => (
          <Link to={`${mail._id}`} key={mail._id}>
            <div className="p-3 border-b hover:bg-gray-100 cursor-pointer transition flex items-center">
              
              {/* ✅ Show blue dot if mail is unread */}
              {mail.read===false && (
                <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
              )}

              <div>
                <h3 className="text-lg font-medium">{mail.subject}</h3>
                <p className="text-gray-500 text-sm">Sender - {mail.from}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
};

export default Inbox;
