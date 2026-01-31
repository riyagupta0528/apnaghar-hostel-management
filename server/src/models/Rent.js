import mongoose from "mongoose";

const rentSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
    month: { type: Number, required: true }, // 1-12
    year: { type: Number, required: true },
    amount: { type: Number, required: true },
    status: { type: String, enum: ["pending", "paid", "overdue"], default: "pending" },
    paidOn: { type: Date }
  },
  { timestamps: true }
);

rentSchema.index({ student: 1, month: 1, year: 1 }, { unique: true });

export default mongoose.model("Rent", rentSchema);




