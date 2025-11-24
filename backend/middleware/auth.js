// backend/middleware/auth.js
import jwt from "jsonwebtoken";
export const requireAuth = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ message: "No token" });
  const token = auth.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, role }
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};
export const requireAdmin = (req, res, next) => {
  if (!req.user) return res.status(401).json({ message: "No user" });
  if (req.user.role !== "admin") return res.status(403).json({ message: "Admin only" });
  next();
};
