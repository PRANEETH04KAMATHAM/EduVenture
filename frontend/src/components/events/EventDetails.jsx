// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import QRDonation from "./QRDonation"; 
// import "./EventDetails.css";

// const EventDetails = () => {
//   const { eventId } = useParams();
//   const [event, setEvent] = useState(null);
//   const [showDonation, setShowDonation] = useState(false);

//   useEffect(() => {
//     fetch(`http://localhost:5000/api/events/${eventId}`)
//       .then((res) => res.json())
//       .then((data) => setEvent(data))
//       .catch((error) => console.error("❌ Error fetching event details:", error));
//   }, [eventId]);

//   if (!event) return <p>Loading event details...</p>;

//   return (
//     <div className="event-details">
//       <h2>{event.name}</h2>
//       <p>{event.description}</p>
//       <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
//       <p><strong>Venue:</strong> {event.venue}</p>
//       <p><strong>Amount Raised:</strong> ₹{event.amountReceived}</p>

//       {/* ✅ Show Donate Button First, Only Show QR Code on Click */}
//       {!showDonation ? (
//         <button onClick={() => setShowDonation(true)}>Donate Now</button>
//       ) : (
//         <QRDonation eventId={eventId} />
//       )}
//     </div>
//   );
// };

// export default EventDetails;



import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import QRDonation from "./QRDonation"; 
import "./EventDetails.css";

const EventDetails = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/events/${eventId}`)
      .then((res) => res.json())
      .then((data) => setEvent(data))
      .catch((error) => console.error("❌ Error fetching event details:", error));
  }, [eventId]);

  if (!event) return <p>Loading event details...</p>;

  return (
    <div className="event-details">
      <h2>{event.name}</h2>
      <p>{event.description}</p>
      <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
      <p><strong>Venue:</strong> {event.venue}</p>
      <p><strong>Amount Raised:</strong> ₹{event.amountReceived}</p>

      <QRDonation eventId={eventId} />
    </div>
  );
};

export default EventDetails;

