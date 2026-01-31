import express from "express";
import { authMiddleware } from "../middleware/auth.js";
import Rent from "../models/Rent.js";

const router = express.Router();

router.use(authMiddleware);

// Create or update rent record
router.post("/", async (req, res) => {
  try {
    const { student, month, year, amount, status } = req.body;
    const rent = await Rent.findOneAndUpdate(
      { student, month, year },
      {
        student,
        month,
        year,
        amount,
        status,
        paidOn: status === "paid" ? new Date() : undefined
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    res.json(rent);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// List rent for a month/year
router.get("/", async (req, res) => {
  try {
    const { month, year } = req.query;
    const query = {};
    if (month) query.month = Number(month);
    if (year) query.year = Number(year);
    const rents = await Rent.find(query).populate("student");
    res.json(rents);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;




