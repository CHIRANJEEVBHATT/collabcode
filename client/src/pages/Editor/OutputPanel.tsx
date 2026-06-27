type Props = {
  output: string;
  loading: boolean;
};

function OutputPanel({ output, loading }: Props) {
  return (
    <div className="h-56 border-t border-slate-700 bg-slate-950 text-white flex flex-col">
      <div className="border-b border-slate-700 px-4 py-2 font-semibold">
        Output
      </div>

      <div className="flex-1 overflow-auto p-4">
        {loading ? (
          <p className="text-yellow-400">Running...</p>
        ) : (
          <pre className="whitespace-pre-wrap break-words">
            {output || "Click 'Run Code' to execute your code."}
          </pre>
        )}
      </div>
    </div>
  );
}

export default OutputPanel;