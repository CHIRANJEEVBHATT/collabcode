import { Code2 } from "lucide-react";

function HomeForm() {
  return (
    <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-xl">

      <div className="mb-8 text-center">
        <Code2 className="mx-auto mb-4 h-12 w-12 text-blue-500" />

        <h1 className="text-3xl font-bold text-white">
          CollabCode
        </h1>

        <p className="mt-2 text-slate-400">
          Real-Time Collaborative Code Editor
        </p>
      </div>

      <form className="space-y-5">

        <div>
          <label className="mb-2 block text-sm text-slate-300">
            Username
          </label>

          <input
            type="text"
            placeholder="Enter username"
            className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none transition focus:border-blue-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-slate-300">
            Room ID
          </label>

          <input
            type="text"
            placeholder="Enter room ID"
            className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none transition focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          Join Room
        </button>

      </form>

      <div className="my-6 flex items-center">
        <div className="h-px flex-1 bg-slate-700"></div>

        <span className="mx-3 text-sm text-slate-400">
          OR
        </span>

        <div className="h-px flex-1 bg-slate-700"></div>
      </div>

      <button
        className="w-full rounded-lg border border-slate-700 py-3 text-white transition hover:bg-slate-800"
      >
        Create New Room
      </button>

    </div>
  );
}

export default HomeForm;