// import React, { useState } from "react";
// import { QRCodeCanvas } from "qrcode.react";
// import "./QRDonation.css";

// const QRDonation = ({ eventId }) => {
//   const [amount, setAmount] = useState("");
//   const [showQR, setShowQR] = useState(false);

//   // ✅ Replace with your actual GPay UPI ID
//   const UPI_ID = "praneethkamatham04@okicici";

//   // Generate UPI Payment Link for GPay
//   const generateUPILink = () => {
//     return `upi://pay?pa=${UPI_ID}&pn=EduVenture&mc=1234&tid=${eventId}&tr=${eventId}&tn=Donation&am=${amount}&cu=INR`;
//   };

//   // ✅ Handle QR Code Generation only when the user clicks "Generate QR"
//   const handleGenerateQR = () => {
//     if (!amount || parseFloat(amount) <= 0) {
//       alert("Please enter a valid donation amount.");
//       return;
//     }
//     setShowQR(true);
//   };

//   return (
//     <div className="qr-container">
//       <h3>Donate via GPay</h3>
//       <input
//         type="number"
//         placeholder="Enter amount (₹)"
//         value={amount}
//         onChange={(e) => setAmount(e.target.value)}
//       />
//       <button onClick={handleGenerateQR}>Generate QR Code</button>

//       {/* Show QR code only after clicking the button */}
//       {showQR && <QRCodeCanvas value={generateUPILink()} size={150} />}
      
//       <p>Scan with GPay to donate.</p>
//     </div>
//   );
// };

// export default QRDonation;




// import React, { useState } from "react";
// import "./QRDonation.css";

// const QRDonation = ({ eventId }) => {
//   const [donorName, setDonorName] = useState("");
//   const [amount, setAmount] = useState("");
//   const [utrNumber, setUtrNumber] = useState("");
//   const [paymentSubmitted, setPaymentSubmitted] = useState(false);

//   const handleSubmitUTR = async () => {
//     if (!donorName.trim() || !utrNumber.trim() || !amount.trim()) {
//       alert("Please enter a valid name, amount, and UTR number.");
//       return;
//     }

//     try {
//       const response = await fetch(
//         `http://localhost:5000/api/donations/verify/${eventId}`,
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ donorName, utrNumber, amount }),
//         }
//       );

//       const data = await response.json();
//       if (response.ok) {
//         alert("Payment submitted for verification!");
//         setPaymentSubmitted(true);
//       } else {
//         alert(`Error: ${data.message}`);
//       }
//     } catch (error) {
//       console.error("Error submitting payment:", error);
//       alert("Something went wrong! Try again.");
//     }
//   };

//   return (
//     <div className="qr-container">
//       <h3>Enter Payment Details</h3>
//       <input
//         type="text"
//         placeholder="Your Name"
//         value={donorName}
//         onChange={(e) => setDonorName(e.target.value)}
//       />
//       <input
//         type="number"
//         placeholder="Enter amount (₹)"
//         value={amount}
//         onChange={(e) => setAmount(e.target.value)}
//       />
//       <input
//         type="text"
//         placeholder="Enter UTR Number"
//         value={utrNumber}
//         onChange={(e) => setUtrNumber(e.target.value)}
//       />
//       <button onClick={handleSubmitUTR}>Submit Payment</button>

//       {paymentSubmitted && <p>✅ Your payment is under verification!</p>}
//     </div>
//   );
// };

// export default QRDonation;



import React, { useState } from "react";
import "./QRDonation.css";

const QRDonation = ({ eventId }) => {
  const [donorName, setDonorName] = useState("");
  const [amount, setAmount] = useState("");
  const [utrNumber, setUtrNumber] = useState("");
  const [paymentSubmitted, setPaymentSubmitted] = useState(false);

  const handleSubmitUTR = async () => {
    if (!donorName.trim() || !utrNumber.trim() || !amount.trim()) {
      alert("Please enter a valid name, amount, and UTR number.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/donations/verify/${eventId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ donorName, utrNumber, amount }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        alert("Payment submitted for verification!");
        setPaymentSubmitted(true);
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error submitting payment:", error);
      alert("Something went wrong! Try again.");
    }
  };

  return (
    <div className="qr-container">
      <h3>Enter Payment Details</h3>
      {/* Display the GPay QR code */}
      <img
        src="\src\assets\gpay_qr.jpg" 
        alt="GPay QR Code" 
        className="gpay-qrcode"
      />
      <input
        type="text"
        placeholder="Your Name"
        value={donorName}
        onChange={(e) => setDonorName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Enter amount (₹)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter UTR Number"
        value={utrNumber}
        onChange={(e) => setUtrNumber(e.target.value)}
      />
      <button onClick={handleSubmitUTR}>Submit Payment</button>

      {paymentSubmitted && <p>✅ Your payment is under verification!</p>}
    </div>
  );
};

export default QRDonation;



