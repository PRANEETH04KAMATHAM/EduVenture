// import express from "express";
// import { db } from "../server.js";
// import jwt from "jsonwebtoken";
// import { ObjectId } from "mongodb"; // ✅ Import ObjectId

// const router = express.Router();

// // 🔹 Middleware: Protect Admin Routes
// const verifyAdmin = (req, res, next) => {
//   const token = req.headers.authorization?.split(" ")[1];

//   if (!token) return res.status(403).json({ message: "Access Denied" });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     if (decoded.role !== "admin") return res.status(403).json({ message: "Unauthorized" });

//     req.admin = decoded;
//     next();
//   } catch (error) {
//     return res.status(401).json({ message: "Invalid Token" });
//   }
// };

// // 🔹 Get Pending Events
// router.get("/events", verifyAdmin, async (req, res) => {
//   try {
//     const eventCollection = db.collection("events");
//     const events = await eventCollection.find({ status: "pending" }).toArray();
//     res.json(events);
//   } catch (error) {
//     res.status(500).json({ error: "Error fetching events" });
//   }
// });

// // 🔹 Approve or Reject Event
// router.put("/events/:eventId", verifyAdmin, async (req, res) => {
//   try {
//     const { eventId } = req.params;

//     // ✅ Validate ObjectId
//     if (!ObjectId.isValid(eventId)) {
//       return res.status(400).json({ message: "Invalid event ID format" });
//     }

//     const { status } = req.body;

//     // ✅ Validate Status Value
//     if (!["approved", "rejected"].includes(status)) {
//       return res.status(400).json({ message: "Invalid status provided" });
//     }

//     const eventCollection = db.collection("events");

//     const updatedEvent = await eventCollection.findOneAndUpdate(
//       { _id: new ObjectId(eventId) },
//       { $set: { status } },
//       { returnDocument: "after" }
//     );

//     if (!updatedEvent.value) {
//       return res.status(404).json({ message: "Event not found in database" });
//     }

//     res.json({ message: `Event ${status} successfully!`, event: updatedEvent.value });
//   } catch (error) {
//     console.error("❌ Error updating event:", error);
//     res.status(500).json({ error: "Error updating event status" });
//   }
// });


// export default router;




import express from "express";
import { db } from "../server.js";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb"; 

const router = express.Router();

// 🔹 Middleware: Protect Admin Routes
const verifyAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(403).json({ message: "Access Denied: No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized: Admin access required." });
    }

    req.admin = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid Token" });
  }
};

// 🔹 Get Pending Events for Approval
router.get("/events", verifyAdmin, async (req, res) => {
  try {
    const eventCollection = db.collection("events");
    const events = await eventCollection.find({ status: "pending" }).toArray();
    res.json(events);
  } catch (error) {
    console.error("❌ Error fetching pending events:", error);
    res.status(500).json({ error: "Error fetching events" });
  }
});

// 🔹 Approve or Reject Event
router.put("/events/:eventId", verifyAdmin, async (req, res) => {
  try {
    const { eventId } = req.params;
    const { status } = req.body;

    // ✅ Validate ObjectId
    if (!ObjectId.isValid(eventId)) {
      return res.status(400).json({ message: "Invalid event ID format." });
    }

    // ✅ Validate Status Value
    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status provided. Use 'approved' or 'rejected'." });
    }

    const eventCollection = db.collection("events");

    const updatedEvent = await eventCollection.findOneAndUpdate(
      { _id: new ObjectId(eventId) },
      { $set: { status } },
      { returnDocument: "after" }
    );

    if (!updatedEvent.value) {
      return res.status(404).json({ message: "Event not found in the database." });
    }

    res.json({ message: `Event ${status} successfully!`, event: updatedEvent.value });
  } catch (error) {
    console.error("❌ Error updating event:", error);
    res.status(500).json({ error: "Error updating event status." });
  }
});

// 🔹 Fetch Pending Donations for Admin Verification
router.get("/pending-donations", verifyAdmin, async (req, res) => {
  try {
    const pendingPaymentsCollection = db.collection("pendingPayments");
    const pendingDonations = await pendingPaymentsCollection.find({ verified: false }).toArray();
    res.json(pendingDonations);
  } catch (error) {
    console.error("❌ Error fetching pending donations:", error);
    res.status(500).json({ error: "Error fetching pending donations." });
  }
});

// 🔹 Verify Donation (Admin Action)
router.put("/verify-donation/:donationId", verifyAdmin, async (req, res) => {
  try {
    const { donationId } = req.params;

    if (!ObjectId.isValid(donationId)) {
      return res.status(400).json({ message: "Invalid Donation ID format." });
    }

    const pendingPaymentsCollection = db.collection("pendingPayments");

    const donation = await pendingPaymentsCollection.findOneAndDelete({
      _id: new ObjectId(donationId),
    });

    if (!donation.value) {
      return res.status(404).json({ message: "Donation not found." });
    }

    const eventCollection = db.collection("events");

    await eventCollection.updateOne(
      { _id: new ObjectId(donation.value.eventId) },
      { $inc: { amountReceived: donation.value.amount } }
    );

    res.json({ message: "Donation verified and added to event!" });
  } catch (error) {
    console.error("❌ Error verifying donation:", error);
    res.status(500).json({ error: "Error verifying donation." });
  }
});

export default router;
