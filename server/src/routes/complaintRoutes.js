import express from "express";
import { authMiddleware } from "../middleware/auth.js";
import Complaint from "../models/Complaint.js";

const router = express.Router();

router.use(authMiddleware);

// Create complaint
router.post("/", async (req, res) => {
  try {
    const complaint = await Complaint.create(req.body);
    res.status(201).json(complaint);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// List complaints
router.get("/", async (req, res) => {
  try {
    const complaints = await Complaint.find().populate("student");
    res.json(complaints);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Update status
router.patch("/:id", async (req, res) => {
  try {
    const complaint = await Complaint.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(complaint);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;




