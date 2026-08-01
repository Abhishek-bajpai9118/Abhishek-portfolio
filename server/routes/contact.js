import express from "express";
import Message from "../models/Message.js";

const router = express.Router();

// POST /api/contact - save a message from the contact form
router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const saved = await Message.create({ name, email, message });
    res.status(201).json({ success: true, id: saved._id });
  } catch (err) {
    res.status(500).json({ error: "Failed to send message" });
  }
});

// GET /api/contact - list messages (for your own admin use)
router.get("/", async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});

export default router;
