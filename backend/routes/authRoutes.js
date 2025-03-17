import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db } from "../server.js"; // Import db AFTER it is initialized

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    console.log("📩 Received Registration Data:", req.body);

    // Ensure `db` is available
    if (!db) {
      console.error("❌ Database connection is not ready.");
      return res.status(500).json({ error: "Database connection not established" });
    }

    const usersCollection = db.collection("users"); // Move inside the route to avoid early access
    const { name, rollNo, branch, phone, email, password } = req.body;

    if (!name || !rollNo || !branch || !phone || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const userExists = await usersCollection.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({ message: "Invalid phone number. Must be 10 digits." });
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message: "Password must be at least 8 characters, include an uppercase letter, a lowercase letter, a number, and a special character.",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await usersCollection.insertOne({
      name,
      rollNo,
      branch,
      phone,
      email,
      password: hashedPassword,
      role: "student",
    });

    res.status(201).json({ message: "User Registered Successfully!" });
  } catch (error) {
    console.error("❌ Registration Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});




// 🔹 User Login API (FIXED)
router.post("/login", async (req, res) => {
  try {
    if (!db) {
      console.error("❌ Database connection is not ready.");
      return res.status(500).json({ error: "Database connection not established" });
    }

    const usersCollection = db.collection("users"); // ✅ Define usersCollection inside the function

    const { email, password } = req.body;

    const user = await usersCollection.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.status(200).json({ message: "Login Successful", token, user });
  } catch (error) {
    console.error("❌ Login Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// 🔹 Admin Login API
router.post("/admin/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Ensure the database is available
    if (!db) {
      console.error("❌ Database connection is not ready.");
      return res.status(500).json({ error: "Database connection not established" });
    }

    const adminCollection = db.collection("admin"); // Get the admin collection
    const admin = await adminCollection.findOne({ email });

    // 🔸 Check if admin exists
    if (!admin) {
      return res.status(400).json({ message: "Admin not found" });
    }

    // 🔸 Validate Password (Since we are not using hashing)
    if (password !== admin.password) {
      return res.status(400).json({ message: "Incorrect Password" });
    }

    // 🔸 Generate JWT Token
    const token = jwt.sign({ id: admin._id, role: "admin" }, process.env.JWT_SECRET, { expiresIn: "7d" });

    // 🔹 Send response with token
    res.status(200).json({ message: "Admin Login Successful", token, admin });

  } catch (error) {
    console.error("❌ Admin Login Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


router.get("/pending-payments", async (req, res) => {
  try {
    const payments = await db.collection("pendingPayments").find({ verified: false }).toArray();
    res.json(payments);
  } catch (error) {
    res.status(500).json({ error: "Error fetching pending payments." });
  }
});

router.post("/verify-payment/:paymentId", async (req, res) => {
  try {
    const payment = await db.collection("pendingPayments").findOne({ _id: new ObjectId(req.params.paymentId) });

    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    await db.collection("events").updateOne(
      { _id: payment.eventId },
      { $inc: { amountReceived: payment.amount } }
    );

    await db.collection("pendingPayments").updateOne(
      { _id: new ObjectId(req.params.paymentId) },
      { $set: { verified: true } }
    );

    res.json({ message: "Payment verified!" });
  } catch (error) {
    res.status(500).json({ error: "Error verifying payment." });
  }
});


export default router;
