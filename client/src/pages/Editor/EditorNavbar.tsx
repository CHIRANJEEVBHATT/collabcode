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
  onShareRoom: () => void;
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
  onShareRoom,
  onLeaveRoom,
  onRunCode,
}: Props) {
  return (
    <div className="border-b border-white/15 bg-zinc-950 px-3 py-3 text-white sm:px-5">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-2 sm:gap-4">
          <h1 className="text-xl font-bold">CollabCode</h1>

          <span className="text-sm">
            Room <strong>{roomId}</strong>
          </span>

          <span className="text-sm font-medium text-zinc-300">JavaScript</span>

          <div className="flex items-center gap-2">
            <span
              className={`h-3 w-3 rounded-full border ${connected ? "border-white bg-white" : "border-zinc-500 bg-transparent"}`}
            />
            {connected ? "Connected" : "Disconnected"}
          </div>

          <select
            value={theme}
            onChange={(e) => onThemeChange(e.target.value)}
            className="rounded border border-white/15 bg-black px-2 py-1 text-white"
          >
            <option value="collabcode-bw">Black & White</option>
            <option value="vs-dark">Dark</option>
            <option value="hc-black">High Contrast</option>
          </select>

          <select
            value={fontSize}
            onChange={(e) => onFontSizeChange(Number(e.target.value))}
            className="rounded border border-white/15 bg-black px-2 py-1 text-white"
          >
            <option value={14}>14</option>
            <option value={16}>16</option>
            <option value={18}>18</option>
            <option value={20}>20</option>
          </select>
        </div>

        <div className="flex flex-wrap gap-2 sm:gap-3">
          <button
            onClick={onRunCode}
            disabled={loading}
            className="rounded bg-white px-4 py-2 font-medium text-black hover:bg-zinc-200 disabled:opacity-50"
          >
            {loading ? "Running..." : "Run"}
          </button>

          <button
            onClick={onCopyRoomId}
            className="rounded border border-white/20 px-4 py-2 hover:bg-white/10"
          >
            Copy ID
          </button>

          <button
            onClick={onShareRoom}
            className="rounded border border-white/20 px-4 py-2 hover:bg-white/10"
          >
            Share Room
          </button>

          <button
            onClick={onDownloadCode}
            className="rounded border border-white/20 px-4 py-2 hover:bg-white/10"
          >
            Download
          </button>

          <button
            onClick={onLeaveRoom}
            className="rounded bg-red-900 px-4 py-2 hover:bg-red-500"
          >
            Leave
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditorNavbar;
