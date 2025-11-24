import express from "express";
import { requireAuth, requireAdmin } from "../middleware/auth.js";
import {
  adminAdd,
  adminUpdate,
  adminDelete
} from "../controllers/transactionController.js";

const router = express.Router();

router.post("/add", requireAuth, requireAdmin, adminAdd);
router.put("/:id", requireAuth, requireAdmin, adminUpdate);
router.delete("/:id", requireAuth, requireAdmin, adminDelete);

export default router;
