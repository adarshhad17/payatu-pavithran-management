import express from "express";
import { requireAuth } from "../middleware/auth.js";
import {
  getAll,
  updateNote
} from "../controllers/transactionController.js";

const router = express.Router();

router.get("/", requireAuth, getAll);
router.put("/:id", requireAuth, updateNote);

export default router;
