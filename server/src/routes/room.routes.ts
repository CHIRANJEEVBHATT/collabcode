import { Router } from "express";
import { createRoom, getRoom } from "../controllers/room.controller";
import { requireAuth } from "../middleware/auth.middleware";

const router = Router();

// Creating rooms requires authentication
router.post("/", requireAuth, createRoom);
router.get("/:roomId", getRoom);

export default router;