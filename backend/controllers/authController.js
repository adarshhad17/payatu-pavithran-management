import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// ==========================
// REGISTER
// ==========================
export const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "Email & password required" });

  const exist = await User.findOne({ email });
  if (exist)
    return res.status(400).json({ message: "Email already used" });

  const hash = await bcrypt.hash(password, 10);

  // IMPORTANT: Set default role as parent
  const user = await User.create({
    name,
    email,
    passwordHash: hash,
    role: "parent",   // 🔥 DEFAULT ROLE FIX
  });

  res.json({ message: "Registered successfully" });
};

// ==========================
// LOGIN
// ==========================
export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user)
    return res.status(400).json({ message: "Invalid email" });

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok)
    return res.status(400).json({ message: "Invalid password" });

  // Generate token with user role
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.json({
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    token,
  });
};
