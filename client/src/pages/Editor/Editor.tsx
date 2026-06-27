import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { socket } from "@/sockets/socket";

import CodeEditor from "./CodeEditor";
import EditorLayout from "./EditorLayout";
import EditorNavbar from "./EditorNavbar";
import UserSidebar from "./UserSidebar";
import OutputPanel from "./OutputPanel";

function Editor() {
  const { roomId = "" } = useParams();
  const navigate = useNavigate();

  const { state } = useLocation();
  const username = state?.username || "Anonymous";

  const [code, setCode] = useState("// Happy Coding 🚀");
  const [users, setUsers] = useState<string[]>([]);
  const [connected, setConnected] = useState(false);

  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    socket.connect();

    socket.on("connect", () => setConnected(true));
    socket.on("disconnect", () => setConnected(false));

    socket.emit("join-room", {
      roomId,
      username,
    });

    socket.on("sync-code", setCode);
    socket.on("code-update", setCode);
    socket.on("room-users", setUsers);

    return () => {
      socket.off("connect");
      socket.off("disconnect");
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

  const runCode = async () => {
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/run", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          language: "javascript",
          code,
        }),
      });

      const data = await response.json();

      setOutput(data.output ?? data.error ?? "No output");
    } catch {
      setOutput("Failed to connect to backend.");
    }

    setLoading(false);
  };

  return (
    <EditorLayout
      navbar={
        <EditorNavbar
          roomId={roomId}
          connected={connected}
          onCopyRoomId={copyRoomId}
          onLeaveRoom={leaveRoom}
          onRunCode={runCode}
          loading={loading}
        />
      }
      sidebar={<UserSidebar users={users} />}
      editor={
        <CodeEditor
          code={code}
          onChange={handleCodeChange}
        />
      }
      output={
        <OutputPanel
          output={output}
          loading={loading}
        />
      }
    />
  );
}

export default Editor;