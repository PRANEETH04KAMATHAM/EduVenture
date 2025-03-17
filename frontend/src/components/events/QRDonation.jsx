import React from "react";
import { QRCodeCanvas } from "qrcode.react";
import "./QRDonation.css";

const QRDonation = ({ eventId }) => {
  const donationURL = `http://localhost:5173/donate/${eventId}`; // ✅ Now opens a donation page

  return (
    <div className="qr-container">
      <h3>Scan to Donate</h3>
      <QRCodeCanvas value={donationURL} size={150} />
      <p>Use any QR scanner to donate.</p>
    </div>
  );
};

export default QRDonation;
