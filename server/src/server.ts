import dotenv from "dotenv";
dotenv.config();

import { createServer } from "http";
import { Server } from "socket.io";

import app from "./app";
import { registerEditorEvents } from "./sockets/editor.socket";
import { connectDB } from "./config/database";
import { verifyJwt } from "./utils/jwt";

const PORT = process.env.PORT || 5000;

async function startServer() {
  await connectDB();

  const httpServer = createServer(app);

  const io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
    },
  });

  // Authenticate sockets using JWT from the handshake auth
  io.use((socket, next) => {
    const token = socket.handshake.auth?.token as string | undefined;

    if (!token) return next();

    const decoded = verifyJwt<{ username?: string }>(token);

    if (decoded) {
      // attach user info to socket.data for handlers
      socket.data.user = decoded;
    }

    next();
  });

  io.on("connection", (socket) => {
    console.log(`✅ ${socket.id} connected`);

    registerEditorEvents(socket);
  });

  httpServer.listen(PORT, () => {
    console.log(`🚀 Server running on ${PORT}`);
  });
}

startServer();