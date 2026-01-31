import express from "express";
import { authMiddleware } from "../middleware/auth.js";
import Visitor from "../models/Visitor.js";

const router = express.Router();

router.use(authMiddleware);

// Log visitor entry
router.post("/", async (req, res) => {
  try {
    const visitor = await Visitor.create(req.body);
    res.status(201).json(visitor);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Mark visitor exit
router.patch("/:id/exit", async (req, res) => {
  try {
    const visitor = await Visitor.findByIdAndUpdate(
      req.params.id,
      { outTime: new Date() },
      { new: true }
    );
    res.json(visitor);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// List visitors
router.get("/", async (req, res) => {
  try {
    const visitors = await Visitor.find().populate("visitingStudent");
    res.json(visitors);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;




