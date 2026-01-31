import express from "express";
import Room from "../models/Room.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.use(authMiddleware);

// Create room
router.post("/", async (req, res) => {
  try {
    const room = await Room.create(req.body);
    res.status(201).json(room);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// List rooms with vacancy
router.get("/", async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(
      rooms.map((r) => ({
        ...r.toObject(),
        vacancy: r.capacity - r.occupied
      }))
    );
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;




