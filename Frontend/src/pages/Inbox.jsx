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
      setMail(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteMail = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await fetch(`http://localhost:5000/mail/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": token
        }
      });

      // ✅ Remove mail from state after deletion
      setMail(mail.filter((m) => m._id !== id));

    } catch (error) {
      console.log("Error deleting mail:", error);
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
          <div key={mail._id} className="p-3 border-b hover:bg-gray-100 cursor-pointer transition flex items-center justify-between">
            <Link to={`${mail._id}`} className="flex items-center flex-grow">
              
              {/* ✅ Show blue dot if mail is unread */}
              {!mail.read && (
                <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
              )}

              <div>
                <h3 className="text-lg font-medium">{mail.subject}</h3>
                <p className="text-gray-500 text-sm">Sender - {mail.from}</p>
              </div>
            </Link>

            {/* ❌ Delete Button */}
            <button
              onClick={() => deleteMail(mail._id)}
              className="ml-4  hover:bg-red-700 p-1"  
            >
              🗑️
            </button>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Inbox;
