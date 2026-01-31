import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    roomNumber: { type: String, required: true, unique: true },
    capacity: { type: Number, required: true, default: 1 },
    occupied: { type: Number, required: true, default: 0 },
    type: { type: String, enum: ["hostel", "pg"], default: "hostel" }
  },
  { timestamps: true }
);

roomSchema.virtual("vacancy").get(function () {
  return this.capacity - this.occupied;
});

export default mongoose.model("Room", roomSchema);




