import { Router } from "express";
import {
  getRoomHistory,
  saveRoomHistory,
} from "../controllers/roomHistory.controller";

const router = Router();

router.get("/:roomId", getRoomHistory);

router.post("/", saveRoomHistory);

export default router;