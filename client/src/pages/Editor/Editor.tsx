import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

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

  const [code, setCode] = useState(
    () => localStorage.getItem("collab-code") || "// Happy Coding 🚀"
  );


  const [theme, setTheme] = useState("vs-dark");
  const [fontSize, setFontSize] = useState(16);

  const [users, setUsers] = useState<string[]>([]);
  const [connected, setConnected] = useState(false);

  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem("collab-code", code);
  }, [code]);

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
      toast.success("Room ID copied");
    } catch {
      toast.error("Failed to copy Room ID");
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
  const clearOutput = () => {
  setOutput("");
};

const downloadCode = () => {
  const blob = new Blob([code], {
    type: "text/javascript",
  });

  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");

  a.href = url;
  a.download = "code.js";

  a.click();

  URL.revokeObjectURL(url);

  toast.success("Downloaded code.js");
};

  return (
    <EditorLayout
      navbar={
        <EditorNavbar
          roomId={roomId}
          connected={connected}
          
          theme={theme}
          fontSize={fontSize}
          loading={loading}
          onDownloadCode={downloadCode}
          
          onThemeChange={setTheme}
          onFontSizeChange={setFontSize}
          onCopyRoomId={copyRoomId}
          onLeaveRoom={leaveRoom}
          onRunCode={runCode}
        />
      }
      sidebar={<UserSidebar users={users} />}
      editor={
        <CodeEditor
          code={code}
          language="javascript"
          theme={theme}
          fontSize={fontSize}
          onChange={handleCodeChange}
          onRun={runCode}
        />
      }
      output={
        <OutputPanel
  output={output}
  loading={loading}
  onClear={clearOutput}
/>
      }
    />
  );
}

export default Editor;