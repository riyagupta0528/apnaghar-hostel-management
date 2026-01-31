import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
    title: { type: String, required: true },
    description: { type: String },
    status: { type: String, enum: ["open", "in_progress", "resolved"], default: "open" },
    priority: { type: String, enum: ["low", "medium", "high"], default: "medium" }
  },
  { timestamps: true }
);

export default mongoose.model("Complaint", complaintSchema);




