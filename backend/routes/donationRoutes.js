import express from "express";
import { db } from "../server.js";
import { ObjectId } from "mongodb";

const router = express.Router();

// 🔹 Donate to an Event
router.post("/donate/:eventId", async (req, res) => {
  try {
    const { donorName, amount } = req.body;
    const donationAmount = parseFloat(amount);

    if (!donorName || isNaN(donationAmount) || donationAmount <= 0) {
      return res.status(400).json({ message: "Invalid donation details." });
    }

    const eventCollection = db.collection("events");

    const updatedEvent = await eventCollection.findOneAndUpdate(
      { _id: new ObjectId(req.params.eventId) },
      { 
        $inc: { amountReceived: donationAmount }, // ✅ Increase amount received
        $push: { donors: { donorName, amount: donationAmount, date: new Date() } } // ✅ Add donor to list
      },
      { returnDocument: "after" }
    );

    if (!updatedEvent.value) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json({ message: "Donation successful!", event: updatedEvent.value });
  } catch (error) {
    res.status(500).json({ error: "Error processing donation" });
  }
});

export default router;
