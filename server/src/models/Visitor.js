import mongoose from "mongoose";

const visitorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String },
    visitingStudent: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
    purpose: { type: String },
    inTime: { type: Date, default: Date.now },
    outTime: { type: Date }
  },
  { timestamps: true }
);

export default mongoose.model("Visitor", visitorSchema);




