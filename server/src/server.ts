import dotenv from "dotenv";
dotenv.config();

import { createServer } from "http";
import { Server } from "socket.io";

import app from "./app";
import { registerEditorEvents } from "./sockets/editor.socket";

const PORT = process.env.PORT || 5000;

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`✅ ${socket.id} connected`);

  registerEditorEvents(socket);
});

httpServer.listen(PORT, () => {
  console.log(`🚀 Server running on ${PORT}`);
});