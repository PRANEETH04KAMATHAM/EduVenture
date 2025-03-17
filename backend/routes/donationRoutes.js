// import express from "express";
// import { db } from "../server.js";
// import { ObjectId } from "mongodb";

// const router = express.Router();

// // 🔹 Donate to an Event
// router.post("/donate/:eventId", async (req, res) => {
//   try {
//     const { donorName, amount } = req.body;
//     const donationAmount = parseFloat(amount);

//     if (!donorName || isNaN(donationAmount) || donationAmount <= 0) {
//       return res.status(400).json({ message: "Invalid donation details." });
//     }

//     const eventCollection = db.collection("events");

//     const updatedEvent = await eventCollection.findOneAndUpdate(
//       { _id: new ObjectId(req.params.eventId) },
//       { 
//         $inc: { amountReceived: donationAmount }, // ✅ Increase amount received
//         $push: { donors: { donorName, amount: donationAmount, date: new Date() } } // ✅ Add donor to list
//       },
//       { returnDocument: "after" }
//     );

//     if (!updatedEvent.value) {
//       return res.status(404).json({ message: "Event not found" });
//     }

//     res.json({ message: "Donation successful!", event: updatedEvent.value });
//   } catch (error) {
//     res.status(500).json({ error: "Error processing donation" });
//   }
// });

// export default router;




import express from "express";
import { db } from "../server.js";
import { ObjectId } from "mongodb";

const router = express.Router();

// 🔹 Submit Payment for Verification
router.post("/verify/:eventId", async (req, res) => {
  try {
    const { utrNumber, amount, donorName } = req.body;
    const { eventId } = req.params;

    if (!utrNumber || !amount || !donorName) {
      return res
        .status(400)
        .json({ message: "Donor Name, UTR number, and amount are required." });
    }

    const pendingPaymentsCollection = db.collection("pendingPayments");

    await pendingPaymentsCollection.insertOne({
      eventId: new ObjectId(eventId),
      donorName,
      utrNumber,
      amount: parseFloat(amount),
      verified: false,
      createdAt: new Date(),
    });

    res.json({ message: "Payment submitted for verification!" });
  } catch (error) {
    console.error("❌ Error processing donation:", error);
    res.status(500).json({ error: "Error processing donation." });
  }
});

// 🔹 Fetch Pending Payments for Admin
router.get("/pending-verifications", async (req, res) => {
  try {
    const pendingPaymentsCollection = db.collection("pendingPayments");
    const pendingPayments = await pendingPaymentsCollection
      .find({ verified: false })
      .toArray();

    res.json(pendingPayments);
  } catch (error) {
    console.error("❌ Error fetching pending payments:", error);
    res.status(500).json({ error: "Error fetching pending payments." });
  }
});

// 🔹 Verify Payment and Add to Event
router.put("/verify/:donationId", async (req, res) => {
  try {
    const { donationId } = req.params;

    if (!ObjectId.isValid(donationId)) {
      return res.status(400).json({ message: "Invalid donation ID format." });
    }

    const pendingPaymentsCollection = db.collection("pendingPayments");
    const donation = await pendingPaymentsCollection.findOne({
      _id: new ObjectId(donationId),
    });

    if (!donation) {
      return res.status(404).json({ message: "Donation not found." });
    }

    // Update event amount
    const eventsCollection = db.collection("events");
    await eventsCollection.updateOne(
      { _id: new ObjectId(donation.eventId) },
      { $inc: { amountReceived: donation.amount } }
    );

    // Mark donation as verified
    await pendingPaymentsCollection.updateOne(
      { _id: new ObjectId(donationId) },
      { $set: { verified: true } }
    );

    res.json({ message: "Donation verified and added to event." });
  } catch (error) {
    console.error("❌ Error verifying donation:", error);
    res.status(500).json({ error: "Error verifying donation." });
  }
});

export default router;
