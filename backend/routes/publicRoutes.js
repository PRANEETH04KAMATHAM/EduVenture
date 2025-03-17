import express from "express";
import { db } from "../server.js";
import { ObjectId } from "mongodb"; // ✅ Ensure ObjectId is imported

const router = express.Router();

// 🔹 Fetch All Approved Events
router.get("/events", async (req, res) => {
  try {
    const eventCollection = db.collection("events");
    const events = await eventCollection.find({ status: "approved" }).toArray();
    res.json(events);
  } catch (error) {
    console.error("❌ Error fetching events:", error);
    res.status(500).json({ error: "Error fetching events" });
  }
});

// ✅ **Fetch a Single Event by ID (Fixes 500 Error)**
router.get("/events/:eventId", async (req, res) => {
  try {
    const { eventId } = req.params;

    // ✅ **Validate event ID**
    if (!ObjectId.isValid(eventId)) {
      console.error(`❌ Invalid Event ID: ${eventId}`);
      return res.status(400).json({ message: "Invalid Event ID format" });
    }

    const eventCollection = db.collection("events");
    const event = await eventCollection.findOne({ _id: new ObjectId(eventId), status: "approved" });

    // ✅ **Check if event exists**
    if (!event) {
      console.error(`❌ Event not found or not approved: ${eventId}`);
      return res.status(404).json({ message: "Event not found or not approved" });
    }

    res.json(event);
  } catch (error) {
    console.error("❌ Error fetching event:", error);
    res.status(500).json({ error: "Error fetching event details" });
  }
});

export default router;
