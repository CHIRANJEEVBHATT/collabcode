import toast from "react-hot-toast";

type Props = {
  output: string;
  loading: boolean;
  onClear: () => void;
};

function OutputPanel({
  output,
  loading,
  onClear,
}: Props) {
  const copyOutput = async () => {
    try {
      await navigator.clipboard.writeText(output);
      toast.success("Output copied");
    } catch {
      toast.error("Failed to copy output");
    }
  };

  return (
    <div className="h-56 border-t border-slate-700 bg-slate-950 text-white flex flex-col">

      <div className="flex items-center justify-between px-4 py-2 border-b border-slate-700">

        <h2 className="font-semibold">
          Output
        </h2>

        <div className="flex gap-2">

          <button
            onClick={copyOutput}
            className="bg-blue-600 hover:bg-blue-700 rounded px-3 py-1 text-sm"
          >
            Copy
          </button>

          <button
            onClick={onClear}
            className="bg-red-600 hover:bg-red-700 rounded px-3 py-1 text-sm"
          >
            Clear
          </button>

        </div>

      </div>

      <div className="flex-1 overflow-auto p-4">

        {loading ? (
          <div className="text-yellow-400">
            Running JavaScript...
          </div>
        ) : (
          <pre className="whitespace-pre-wrap break-words">
            {output || "Program output will appear here."}
          </pre>
        )}

      </div>
    </div>
  );
}

export default OutputPanel;