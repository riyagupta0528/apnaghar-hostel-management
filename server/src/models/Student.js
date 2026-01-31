import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    guardianName: { type: String },
    guardianPhone: { type: String },
    address: { type: String },
    room: { type: mongoose.Schema.Types.ObjectId, ref: "Room" },
    checkInDate: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default mongoose.model("Student", studentSchema);




