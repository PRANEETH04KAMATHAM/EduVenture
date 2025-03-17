// import express from "express";
// import multer from "multer";
// import { db } from "../server.js";
// import { ObjectId } from "mongodb";

// const router = express.Router();

// // Setup file upload
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

// // 🔹 Student creates an event
// router.post("/create-event", upload.single("permissionLetter"), async (req, res) => {
//   try {
//     const { name, description, date, venue, organizer } = req.body;

//     const eventCollection = db.collection("events");

//     await eventCollection.insertOne({
//       name,
//       description,
//       date,
//       venue,
//       organizer,
//       permissionLetter: req.file.buffer, // Store as binary
//       status: "pending", // Default status
//     });

//     res.status(201).json({ message: "Event submitted successfully!" });
//   } catch (error) {
//     console.error("Error creating event:", error);
//     res.status(500).json({ error: "Failed to create event." });
//   }
// });

// // 🔹 Fetch Events Created by a Specific Student
// router.get("/my-events/:rollNo", async (req, res) => {
//     try {
//       const { rollNo } = req.params;
//       const eventCollection = db.collection("events");
  
//       // Find all events where the organizer's roll number matches
//       const events = await eventCollection.find({ organizer: rollNo }).toArray();
  
//       if (events.length === 0) {
//         return res.status(404).json({ message: "No events found for this student." });
//       }
  
//       res.json(events);
//     } catch (error) {
//       console.error("Error fetching student events:", error);
//       res.status(500).json({ error: "Failed to fetch events" });
//     }
//   });

// export default router;





import express from "express";
import multer from "multer";
import { db } from "../server.js";
import { ObjectId } from "mongodb";

const router = express.Router();

// Use multer.none() since we are not expecting any file uploads.
const upload = multer();

router.post("/create-event", upload.none(), async (req, res) => {
  try {
    const { name, description, date, venue, organizer, sharedDriveLink } = req.body;
    
    const eventCollection = db.collection("events");

    // Insert the event into the database with the shared drive link.
    await eventCollection.insertOne({
      name,
      description,
      date, // You might want to convert this to a Date object if needed.
      venue,
      organizer,
      sharedDriveLink, // Save the URL for document verification.
      status: "pending", // Default status.
      createdAt: new Date(),
    });

    res.status(201).json({ message: "Event submitted successfully!" });
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({ error: "Failed to create event." });
  }
});

// 🔹 Fetch Events Created by a Specific Student
router.get("/my-events/:rollNo", async (req, res) => {
  try {
    const { rollNo } = req.params;
    const eventCollection = db.collection("events");

    // Find all events where the organizer's roll number matches.
    const events = await eventCollection.find({ organizer: rollNo }).toArray();

    if (events.length === 0) {
      return res.status(404).json({ message: "No events found for this student." });
    }

    res.json(events);
  } catch (error) {
    console.error("Error fetching student events:", error);
    res.status(500).json({ error: "Failed to fetch events" });
  }
});

export default router;
