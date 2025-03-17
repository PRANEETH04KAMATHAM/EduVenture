import React, { useEffect, useState } from "react";

const PaymentVerification = () => {
  const [pendingPayments, setPendingPayments] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/admin/pending-payments")
      .then((res) => res.json())
      .then((data) => setPendingPayments(data))
      .catch((error) => console.error("❌ Error fetching pending payments:", error));
  }, []);

  const verifyPayment = async (paymentId, eventId, amount) => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/verify-payment/${paymentId}`, {
        method: "POST",
      });

      if (response.ok) {
        alert("Payment verified successfully!");
        window.location.reload();
      }
    } catch (error) {
      console.error("❌ Error verifying payment:", error);
    }
  };

  return (
    <div>
      <h2>Pending Payment Verifications</h2>
      {pendingPayments.length === 0 ? (
        <p>No pending payments.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>UTR Number</th>
              <th>Amount</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {pendingPayments.map((payment) => (
              <tr key={payment._id}>
                <td>{payment.utrNumber}</td>
                <td>₹{payment.amount}</td>
                <td>
                  <button onClick={() => verifyPayment(payment._id, payment.eventId, payment.amount)}>
                    Verify Payment
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PaymentVerification;
