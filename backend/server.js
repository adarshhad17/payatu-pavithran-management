import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// ===========================
// Connect to MongoDB
// ===========================
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("🔥 MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

// ===========================
// Import Routes
// ===========================
import authRoutes from "./routes/auth.js";
import transactionRoutes from "./routes/transactions.js";
import adminRoutes from "./routes/admin.js";

// ===========================
// Route Mounting
// ===========================
app.use("/api/auth", authRoutes);             // login, register
app.use("/api/transactions", transactionRoutes); // user + parent routes
app.use("/api/admin", adminRoutes);          // admin only (add/edit/delete)

// ===========================
// Root Check
// ===========================
app.get("/", (req, res) => {
  res.send("API is running...");
});

// ===========================
// Start Server
// ===========================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
