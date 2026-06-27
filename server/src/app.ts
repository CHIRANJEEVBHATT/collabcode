import express from "express";
import cors from "cors";

import runRoutes from "./routes/run.routes";

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

export default app;