import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },

    // IMPORTANT FIX:
    role: { type: String, enum: ["parent", "admin"], default: "parent" },
  },
  { timestamps: true }
);

export default mongoose.model("User", schema);
