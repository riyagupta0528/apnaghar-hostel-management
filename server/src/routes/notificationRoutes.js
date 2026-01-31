import express from "express";
import { authMiddleware } from "../middleware/auth.js";
import Notification from "../models/Notification.js";

const router = express.Router();

router.use(authMiddleware);

// Create notification
router.post("/", async (req, res) => {
  try {
    const notification = await Notification.create(req.body);
    res.status(201).json(notification);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// List notifications
router.get("/", async (req, res) => {
  try {
    const { studentId } = req.query;
    const query = {};
    if (studentId) query.student = studentId;
    const notifications = await Notification.find(query).sort({ createdAt: -1 });
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Mark as read
router.patch("/:id/read", async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );
    res.json(notification);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;




