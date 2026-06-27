import { Socket } from "socket.io";

const roomCode = new Map<string, string>();

const roomUsers = new Map<
  string,
  {
    socketId: string;
    username: string;
  }[]
>();

export const registerEditorEvents = (socket: Socket) => {
  socket.on(
    "join-room",
    ({ roomId, username }: { roomId: string; username: string }) => {
      socket.join(roomId);

      console.log(`${username} joined ${roomId}`);

      const users = roomUsers.get(roomId) || [];

      users.push({
        socketId: socket.id,
        username,
      });

      roomUsers.set(roomId, users);

      socket.emit("sync-code", roomCode.get(roomId) || "// Happy Coding 🚀");

      socket.to(roomId).emit("code-update", roomCode.get(roomId) || "// Happy Coding 🚀");

      socket.to(roomId).emit("user-joined", username);

      socket
        .to(roomId)
        .emit(
          "room-users",
          users.map((u) => u.username)
        );

      socket.emit(
        "room-users",
        users.map((u) => u.username)
      );
    }
  );

  socket.on(
    "code-change",
    ({ roomId, code }: { roomId: string; code: string }) => {
      roomCode.set(roomId, code);

      socket.to(roomId).emit("code-update", code);
    }
  );

  socket.on("disconnecting", () => {
    socket.rooms.forEach((roomId) => {
      if (roomId === socket.id) return;

      const users = roomUsers.get(roomId) || [];

      const updated = users.filter((u) => u.socketId !== socket.id);

      roomUsers.set(roomId, updated);

      socket.to(roomId).emit(
        "room-users",
        updated.map((u) => u.username)
      );
    });
  });

  socket.on("disconnect", () => {
    console.log(`${socket.id} disconnected`);
  });
};