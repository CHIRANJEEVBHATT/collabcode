import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import { socket } from "@/sockets/socket";

import CodeEditor from "./CodeEditor";
import EditorLayout from "./EditorLayout";
import EditorNavbar from "./EditorNavbar";
import UserSidebar from "./UserSidebar";
import OutputPanel from "./OutputPanel";
import { getRoomHistory, saveRoomHistory } from "@/services/api";

function Editor() {
  const { roomId = "" } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();

  let username = state?.username || "Anonymous";
  try {
    const stored = localStorage.getItem("user");
    if (stored) {
      const u = JSON.parse(stored);
      username = username || u.username || username;
    }
  } catch {}

  const [code, setCode] = useState("// Happy Coding 🚀");
  const latestCodeRef = useRef(code);


  const [theme, setTheme] = useState("vs-dark");
  const [fontSize, setFontSize] = useState(16);

  const [users, setUsers] = useState<string[]>([]);
  const [connected, setConnected] = useState(false);

  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const init = async () => {
      try {
        const res = (await getRoomHistory(roomId)) as { history?: { latestCode?: string } };

        if (res.history?.latestCode) {
          setCode(res.history.latestCode);
          latestCodeRef.current = res.history.latestCode;
        }
      } catch (err) {
        // ignore
      }

      try {
        const token = localStorage.getItem("token");

        if (token) {
          // @ts-ignore
          socket.auth = { token };
        }
      } catch {}

      socket.connect();

      socket.on("connect", () => setConnected(true));
      socket.on("disconnect", () => setConnected(false));

      socket.emit("join-room", { roomId, username });

      socket.on("sync-code", (c: string) => {
        setCode(c);
        latestCodeRef.current = c;
      });

      socket.on("code-update", (c: string) => {
        setCode(c);
        latestCodeRef.current = c;
      });

      socket.on("room-users", setUsers);
    };

    init();

    const autosave = setInterval(() => {
      const latest = latestCodeRef.current;

      saveRoomHistory(roomId, latest).catch(() => {});
    }, 5000);

    return () => {
      clearInterval(autosave);
      socket.off("connect");
      socket.off("disconnect");
      socket.off("sync-code");
      socket.off("code-update");
      socket.off("room-users");
      socket.disconnect();
    };
  }, [roomId]);

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

  const shareRoom = async () => {
    const inviteLink = `${window.location.origin}/editor/${roomId}`;

    try {
      await navigator.clipboard.writeText(inviteLink);
      toast.success("Room link copied. Share it with others.");
    } catch {
      toast.error("Could not copy the room link");
    }
  };

  const leaveRoom = () => {
    socket.disconnect();
    navigate("/");
  };

  const runCode = async () => {
    setLoading(true);

    try {
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };

      const token = localStorage.getItem("token");

      if (token) headers.Authorization = `Bearer ${token}`;

      const response = await fetch("http://localhost:5000/run", {
        method: "POST",
        headers,
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
          onShareRoom={shareRoom}
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