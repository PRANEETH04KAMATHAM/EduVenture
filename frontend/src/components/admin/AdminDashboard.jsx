// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import "./AdminDashboard.css"; // Import CSS

// const AdminDashboard = () => {
//   const [events, setEvents] = useState([]);
//   const navigate = useNavigate();

//   // 🔹 Fetch Pending Events from Backend
//   useEffect(() => {
//     const fetchEvents = async () => {
//       try {
//         const response = await fetch("http://localhost:5000/api/admin/events", {
//           headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
//         });
//         const data = await response.json();
//         setEvents(data);
//       } catch (error) {
//         console.error("❌ Error fetching events:", error);
//       }
//     };
//     fetchEvents();
//   }, []);

//   // 🔹 Handle Logout
//   const handleLogout = () => {
//     localStorage.removeItem("adminToken");
//     localStorage.removeItem("admin");
//     navigate("/admin/login");
//   };

//   return (
//     <div className="admin-dashboard-container">
//       <aside className="sidebar">
//         <h2>Admin Dashboard</h2>
//         <ul>
//           <li>Pending Events</li>
//           <li><button onClick={handleLogout}>Logout</button></li>
//         </ul>
//       </aside>

//       <main className="dashboard-content">
//         <h1>Pending Event Approvals</h1>
//         {events.length === 0 ? (
//           <p>No pending events.</p>
//         ) : (
//           <table>
//             <thead>
//               <tr>
//                 <th>Event Name</th>
//                 <th>Organizer</th>
//                 <th>Status</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {events.map((event) => (
//                 <tr key={event._id}>
//                   <td>{event.name}</td>
//                   <td>{event.organizer}</td>
//                   <td>{event.status}</td>
//                   <td>
//                     <button onClick={() => updateEventStatus(event._id, "approved")}>Approve</button>
//                     <button onClick={() => updateEventStatus(event._id, "rejected")}>Reject</button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </main>
//     </div>
//   );
// };

// // 🔹 Approve/Reject Event Function
// const updateEventStatus = async (eventId, status) => {
//   try {
//     const response = await fetch(`http://localhost:5000/api/admin/events/${eventId}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${localStorage.getItem("adminToken") || ""}`, 
//       },
//       body: JSON.stringify({ status }),
//     });

//     if (response.ok) {
//       alert(`Event ${status} successfully!`);
//       window.location.reload(); // Refresh page
//     }
//   } catch (error) {
//     console.error("❌ Error updating event:", error);
//   }
// };

// export default AdminDashboard;


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [events, setEvents] = useState([]);
  const [pendingDonations, setPendingDonations] = useState([]);
  const [activeTab, setActiveTab] = useState("events"); // "events" or "donations"
  const [selectedDocument, setSelectedDocument] = useState(null);
  const navigate = useNavigate();

  // 🔹 Fetch Pending Events from Backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/admin/events", {
          headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
        });
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("❌ Error fetching events:", error);
      }
    };
    fetchEvents();
  }, []);

  // 🔹 Fetch Pending Donations from Backend
  useEffect(() => {
    const fetchPendingDonations = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/donations/pending-verifications");
        const data = await response.json();
        setPendingDonations(data);
      } catch (error) {
        console.error("❌ Error fetching donations:", error);
      }
    };
    fetchPendingDonations();
  }, []);

  // 🔹 Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("admin");
    navigate("/");
  };

  // 🔹 Approve/Reject Event Function
  const updateEventStatus = async (eventId, status) => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/events/${eventId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("adminToken") || ""}`,
        },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        alert(`Event ${status} successfully!`);
        // Optionally update events in state (here, we remove the updated event)
        setEvents((prevEvents) => prevEvents.filter((event) => event._id !== eventId));
      }
    } catch (error) {
      console.error("❌ Error updating event:", error);
    }
  };

  // 🔹 Verify Donation Function
  const verifyDonation = async (donationId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/donations/verify/${donationId}`, {
        method: "PUT",
      });

      if (response.ok) {
        alert("Donation verified and added to event!");
        setPendingDonations((prev) =>
          prev.filter((donation) => donation._id !== donationId)
        );
      } else {
        alert("Failed to verify donation.");
      }
    } catch (error) {
      console.error("❌ Error verifying donation:", error);
    }
  };

  const formatUrl = (url) => {
    if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
      return "https://" + url;
    }
    return url;
  };
  

  // 🔹 Handle Viewing Document Uploads
  const viewDocument = (documentUrl) => {
    setSelectedDocument(documentUrl);
  };

  // 🔹 Close Document Modal
  const closeModal = () => {
    setSelectedDocument(null);
  };

  return (
    <div className="admin-dashboard-container">
      <aside className="sidebar">
        <h2>Admin Dashboard</h2>
        <ul>
          <li
            className={activeTab === "events" ? "active" : ""}
            onClick={() => setActiveTab("events")}
          >
            Pending Events
          </li>
          <li
            className={activeTab === "donations" ? "active" : ""}
            onClick={() => setActiveTab("donations")}
          >
            Pending Donations
          </li>
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </aside>

      <main className="dashboard-content">
        {activeTab === "events" && (
          <section>
            <h1>Pending Event Approvals</h1>
            {events.length === 0 ? (
              <p>No pending events.</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Event Name</th>
                    <th>Organizer</th>
                    <th>Status</th>
                    <th>Document</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map((event) => (
                    <tr key={event._id}>
                      <td>{event.name}</td>
                      <td>{event.organizer}</td>
                      <td>{event.status}</td>
                      <td>
                        {event.sharedDriveLink ? (
                          <a
                            href={formatUrl(event.sharedDriveLink)}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {formatUrl(event.sharedDriveLink)}
                          </a>
                        ) : (
                          "No Document"
                        )}
                      </td>
                      <td>
                        <button onClick={() => updateEventStatus(event._id, "approved")}>
                          Approve
                        </button>
                        <button onClick={() => updateEventStatus(event._id, "rejected")}>
                          Reject
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </section>
        )}

        {activeTab === "donations" && (
          <section>
            <h1>Pending Donations</h1>
            {pendingDonations.length === 0 ? (
              <p>No pending donations.</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Donor Name</th>
                    <th>Amount (₹)</th>
                    <th>UTR Number</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingDonations.map((donation) => (
                    <tr key={donation._id}>
                      <td>{donation.donorName}</td>
                      <td>{donation.amount}</td>
                      <td>{donation.utrNumber}</td>
                      <td>
                        <button onClick={() => verifyDonation(donation._id)}>Verify</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </section>
        )}
      </main>

      {selectedDocument && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Document Upload</h2>
            {/* For PDFs or images, you can render using an <iframe> or <embed> if needed */}
            <iframe
              src={selectedDocument}
              title="Uploaded document"
              style={{ width: "100%", height: "600px", border: "none" }}
            ></iframe>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;

