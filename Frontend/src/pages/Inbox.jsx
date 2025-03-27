import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { mailActions } from "../store/mail";

const Inbox = () => {
  const { data: mails, loading, error, refetch } = useFetch({
    url: "http://localhost:5000/mail/get",
    method: "GET",
  });

  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  

  useEffect(() => {
    let unread=0;
    if (mails) {
      mails.forEach(element => {
        if(!element.read)
        unread++;
      });
      dispatch(mailActions.setMails({mails,unread}));
    }
  }, [mails, dispatch]);

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 2000);

    return () => clearInterval(interval);
  }, [refetch]);

  const deleteMail = async (id) => {
    try {
      await fetch(`http://localhost:5000/mail/delete/${id}`, {
        method: "DELETE",
        headers: { Authorization: token },
      });

      dispatch(mailActions.deleteMail(id)); 
      refetch();
    } catch (error) {
      console.error("Error deleting mail:", error);
    }
  };

  if (error) return <p>Error: {error}</p>;

  return (
    <main className="flex-grow bg-white p-4">
      <h2 className="text-xl font-semibold mb-4">Inbox</h2>
      <div className="border rounded-lg overflow-hidden shadow-md">
        {mails?.length > 0 ? (
          mails.map((m) => (
            <div
              key={m._id}
              className="p-3 border-b hover:bg-gray-100 cursor-pointer transition flex items-center justify-between"
            >
              <Link to={`${m._id}`} className="flex items-center flex-grow">
                {!m.read && <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>}
                <div>
                  <h3 className="text-lg font-medium">{m.subject}</h3>
                  <p className="text-gray-500 text-sm">Sender - {m.from}</p>
                </div>
              </Link>

              <button
                onClick={() => deleteMail(m._id)}
                className="ml-4 hover:bg-red-700 p-1"
              >
                🗑️
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500 p-4">No emails found.</p>
        )}
      </div>
    </main>
  );
};

export default Inbox;
