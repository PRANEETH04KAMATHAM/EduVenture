import express from "express";
import { db } from "../server.js";

const router = express.Router();

// 🔹 Fetch Only Approved Events
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

export default router;
