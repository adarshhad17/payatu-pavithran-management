import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    indexNumber: Number,
    name: String,

    iGive: { type: Number, default: null },
    theyGive: { type: Number, default: null },

    diff: { type: Number, default: null },

    note: { type: Number, default: null },
    result: { type: Number, default: null },

    date: { type: String, default: "" }
  },
  { minimize: false }
);

export default mongoose.model("Transaction", schema);
