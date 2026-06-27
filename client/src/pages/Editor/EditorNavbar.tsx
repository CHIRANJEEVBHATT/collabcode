type Props = {
  roomId: string;
  connected: boolean;
  onCopyRoomId: () => void;
  onLeaveRoom: () => void;
  onRunCode: () => void;
  loading: boolean;
};

function EditorNavbar({
  roomId,
  connected,
  onCopyRoomId,
  onLeaveRoom,
  onRunCode,
  loading,
}: Props) {
  return (
    <div className="h-16 border-b border-slate-700 bg-slate-900 text-white px-6 flex items-center justify-between">
      <div className="flex items-center gap-6">
        <h1 className="text-xl font-bold">CollabCode</h1>

        <div className="text-sm text-slate-300">
          Room:
          <span className="ml-2 font-semibold text-white">{roomId}</span>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`h-3 w-3 rounded-full ${
              connected ? "bg-green-500" : "bg-red-500"
            }`}
          />

          <span className="text-sm">
            {connected ? "Connected" : "Disconnected"}
          </span>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onRunCode}
          disabled={loading}
          className="rounded bg-green-600 px-4 py-2 hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? "Running..." : "Run Code"}
        </button>

        <button
          onClick={onCopyRoomId}
          className="rounded bg-blue-600 px-4 py-2 hover:bg-blue-700"
        >
          Copy Room ID
        </button>

        <button
          onClick={onLeaveRoom}
          className="rounded bg-red-600 px-4 py-2 hover:bg-red-700"
        >
          Leave Room
        </button>
      </div>
    </div>
  );
}

export default EditorNavbar;