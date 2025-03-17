import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { MongoClient } from "mongodb";
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import studentRoutes from "./routes/studentRoutes.js"; // Import student routes
import donationRoutes from "./routes/donationRoutes.js"; // Import Donation Routes
import publicRoutes from "./routes/publicRoutes.js"; 

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// MongoDB Connection
const client = new MongoClient(process.env.MONGO_URI);

let db;
client.connect()
  .then(() => {
    console.log("✅ MongoDB Connected");
    db = client.db("EduVentureDB");

    // Start server only after DB connection
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch(err => console.error(err));

export { db };

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes); // ✅ Protect Admin API

app.use("/api/student", studentRoutes); // ✅ Ensure this line is present

app.use("/api/donations", donationRoutes);  // ✅ Corrected Route

app.use("/api", publicRoutes); // ✅ Ensure /api prefix is correct