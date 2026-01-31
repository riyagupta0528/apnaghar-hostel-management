import express from "express";
import Student from "../models/Student.js";
import Room from "../models/Room.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

// All student routes are admin-protected
router.use(authMiddleware);

// Create student + allocate room
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, guardianName, guardianPhone, address, roomId } = req.body;
    const room = await Room.findById(roomId);
    if (!room) return res.status(404).json({ message: "Room not found" });
    if (room.occupied >= room.capacity) {
      return res.status(400).json({ message: "Room is full" });
    }

    const student = await Student.create({
      name,
      email,
      phone,
      guardianName,
      guardianPhone,
      address,
      room: room._id
    });

    room.occupied += 1;
    await room.save();

    res.status(201).json(student);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// List students with room info
router.get("/", async (req, res) => {
  try {
    const students = await Student.find().populate("room");
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Vacancy status helper: counts
router.get("/stats/vacancy", async (req, res) => {
  try {
    const rooms = await Room.find();
    const totalRooms = rooms.length;
    const totalBeds = rooms.reduce((sum, r) => sum + r.capacity, 0);
    const occupiedBeds = rooms.reduce((sum, r) => sum + r.occupied, 0);
    const vacantBeds = totalBeds - occupiedBeds;
    res.json({ totalRooms, totalBeds, occupiedBeds, vacantBeds });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;




