import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { socket } from "@/sockets/socket";
import CodeEditor from "./CodeEditor";

function Editor() {
  const { roomId } = useParams();
  const navigate = useNavigate();

  const { state } = useLocation();

  const username = state?.username || "Anonymous";

  const [code, setCode] = useState("// Happy Coding 🚀");
  const [users, setUsers] = useState<string[]>([]);

  useEffect(() => {
    socket.connect();

    socket.emit("join-room", {
      roomId,
      username,
    });

    socket.on("sync-code", setCode);
    socket.on("code-update", setCode);
    socket.on("room-users", setUsers);

    return () => {
      socket.off("sync-code");
      socket.off("code-update");
      socket.off("room-users");

      socket.disconnect();
    };
  }, []);

  const handleCodeChange = (value: string) => {
    setCode(value);

    socket.emit("code-change", {
      roomId,
      code: value,
    });
  };

  const copyRoomId = async () => {
    if (!roomId) return;

    try {
      await navigator.clipboard.writeText(roomId);
      alert("Room ID copied!");
    } catch {
      alert("Failed to copy Room ID");
    }
  };

  const leaveRoom = () => {
    socket.disconnect();
    navigate("/");
  };

  return (
    <div className="flex h-screen">
      <div className="w-56 bg-slate-900 text-white p-4 flex flex-col">
        <h2 className="font-bold text-lg mb-4">Users</h2>

        <div className="flex-1 space-y-2">
          {users.map((user) => (
            <p key={user}>{user}</p>
          ))}
        </div>

        <button
          onClick={copyRoomId}
          className="mt-4 w-full rounded bg-blue-600 px-3 py-2 hover:bg-blue-700 transition"
        >
          Copy Room ID
        </button>

        <button
          onClick={leaveRoom}
          className="mt-3 w-full rounded bg-red-600 px-3 py-2 hover:bg-red-700 transition"
        >
          Leave Room
        </button>
      </div>

      <div className="flex-1">
        <CodeEditor code={code} onChange={handleCodeChange} />
      </div>
    </div>
  );
}

export default Editor;