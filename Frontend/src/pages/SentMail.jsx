import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";

const SentMail = () => {
  const { data: mails, loading, error, refetch } = useFetch({
    url: "http://localhost:5000/mail/get/sent",
    method: "GET",
  });

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 2000);

    return () => clearInterval(interval);
  }, [refetch]);

  if (error) return <p>Error: {error}</p>;

  return (
    <main className="flex-grow bg-white p-4">
      <h2 className="text-xl font-semibold mb-4">Sent Box</h2>
      <div className="border rounded-lg overflow-hidden shadow-md">
        {mails?.length > 0 ? (
          mails.map((m) => (
            <Link to={`${m._id}`} key={m._id}>
              <div className="p-3 border-b hover:bg-gray-100 cursor-pointer transition">
                <h3 className="text-lg font-medium">{m.subject}</h3>
                <p className="text-gray-500 text-sm">Sent To - {m.to}</p>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-gray-500 p-4">No sent emails found.</p>
        )}
      </div>
    </main>
  );
};

export default SentMail;
