import express from "express";
import { db } from "../server.js";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb"; // ✅ Import ObjectId

const router = express.Router();

// 🔹 Middleware: Protect Admin Routes
const verifyAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(403).json({ message: "Access Denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "admin") return res.status(403).json({ message: "Unauthorized" });

    req.admin = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid Token" });
  }
};

// 🔹 Get Pending Events
router.get("/events", verifyAdmin, async (req, res) => {
  try {
    const eventCollection = db.collection("events");
    const events = await eventCollection.find({ status: "pending" }).toArray();
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: "Error fetching events" });
  }
});

// 🔹 Approve or Reject Event
router.put("/events/:eventId", verifyAdmin, async (req, res) => {
  try {
    const { eventId } = req.params;

    // ✅ Validate ObjectId
    if (!ObjectId.isValid(eventId)) {
      return res.status(400).json({ message: "Invalid event ID format" });
    }

    const { status } = req.body;

    // ✅ Validate Status Value
    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status provided" });
    }

    const eventCollection = db.collection("events");

    const updatedEvent = await eventCollection.findOneAndUpdate(
      { _id: new ObjectId(eventId) },
      { $set: { status } },
      { returnDocument: "after" }
    );

    if (!updatedEvent.value) {
      return res.status(404).json({ message: "Event not found in database" });
    }

    res.json({ message: `Event ${status} successfully!`, event: updatedEvent.value });
  } catch (error) {
    console.error("❌ Error updating event:", error);
    res.status(500).json({ error: "Error updating event status" });
  }
});

export default router;
