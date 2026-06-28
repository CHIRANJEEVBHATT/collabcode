import express from "express";
import cors from "cors";

import runRoutes from "./routes/run.routes";
import roomRoutes from "./routes/room.routes";
import roomHistoryRoutes from "./routes/roomHistory.routes";
import authRoutes from "./routes/auth.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (_, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running 🚀",
  });
});

app.use("/run", runRoutes);
app.use("/rooms", roomRoutes);
app.use("/room-history", roomHistoryRoutes);
app.use("/auth", authRoutes);

export default app;