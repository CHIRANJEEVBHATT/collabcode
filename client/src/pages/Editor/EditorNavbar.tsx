type Props = {
  roomId: string;
  connected: boolean;
  theme: string;
  fontSize: number;
  loading: boolean;

  onThemeChange: (value: string) => void;
  onFontSizeChange: (value: number) => void;
  onDownloadCode: () => void;
  onCopyRoomId: () => void;
  onLeaveRoom: () => void;
  onRunCode: () => void;
};

function EditorNavbar({
  roomId,
  connected,
  theme,
  fontSize,
  loading,
  onThemeChange,
  onFontSizeChange,
    onDownloadCode,
  onCopyRoomId,
  onLeaveRoom,
  onRunCode,
}: Props) {
  return (
    <div className="h-16 bg-slate-900 border-b border-slate-700 flex items-center justify-between px-5 text-white">
      <div className="flex items-center gap-4">
        <h1 className="font-bold text-xl">CollabCode</h1>

        <span className="text-sm">
          Room <strong>{roomId}</strong>
        </span>

        <span className="text-sm font-medium text-yellow-400">
          JavaScript
        </span>

        <div className="flex items-center gap-2">
          <span
            className={`w-3 h-3 rounded-full ${
              connected ? "bg-green-500" : "bg-red-500"
            }`}
          />
          {connected ? "Connected" : "Disconnected"}
        </div>

        <select
          value={theme}
          onChange={(e) => onThemeChange(e.target.value)}
          className="bg-slate-800 rounded px-2 py-1"
        >
          <option value="vs-dark">Dark</option>
          <option value="light">Light</option>
          <option value="hc-black">High Contrast</option>
        </select>

        <select
          value={fontSize}
          onChange={(e) => onFontSizeChange(Number(e.target.value))}
          className="bg-slate-800 rounded px-2 py-1"
        >
          <option value={14}>14</option>
          <option value={16}>16</option>
          <option value={18}>18</option>
          <option value={20}>20</option>
        </select>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onRunCode}
          disabled={loading}
          className="bg-green-600 hover:bg-green-700 disabled:opacity-50 px-4 py-2 rounded"
        >
          {loading ? "Running..." : "Run"}
        </button>

        <button
          onClick={onCopyRoomId}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
        >
          Copy
        </button>
        <button
          onClick={onDownloadCode}
          className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded"
        >
          Download
        </button>
        <button
          onClick={onLeaveRoom}
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
        >
          Leave
        </button>
      </div>
    </div>
  );
}

export default EditorNavbar;