import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { v4 as uuid } from "uuid";
import toast from "react-hot-toast";
import { Code2 } from "lucide-react";

import { createRoom, getRoom } from "@/services/api";

const schema = z.object({
  roomId: z.string().trim().optional(),
});

type HomeFormData = z.infer<typeof schema>;

function HomeForm() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("Anonymous");

  const {
    register,
    handleSubmit,
  } = useForm<HomeFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      roomId: "",
    },
  });

  useEffect(() => {
    const saved = localStorage.getItem("user");

    if (saved) {
      try {
        const u = JSON.parse(saved);
        setUsername(u.username || "Anonymous");
      } catch {
        setUsername("Anonymous");
      }
    }
  }, []);

  const handleJoinRoom = async (data: HomeFormData) => {
    if (!data.roomId?.trim()) {
      toast.error("Please enter a Room ID");
      return;
    }

    try {
      await getRoom(data.roomId);
      navigate(`/editor/${data.roomId}`);
    } catch (err) {
      console.error("Join failed:", err);
      toast.error(err instanceof Error ? err.message : "Failed to join room");
    }
  };

  const handleCreateRoom = async () => {
    if (!username || username === "Anonymous") {
      toast.error("You must be logged in to create a room");
      return;
    }

    const roomId = uuid();

    try {
      await createRoom(roomId, username);
      toast.success("Room created");
      navigate(`/editor/${roomId}`);
    } catch (err: any) {
      toast.error(err.message || "Failed to create room");
    }
  };

  return (
    <div className="w-full max-w-md rounded-2xl border border-white/15 bg-zinc-950 p-8 shadow-xl shadow-black">
      <div className="mb-8 text-center">
        <Code2 className="mx-auto mb-4 h-12 w-12 text-white" />

        <h1 className="text-3xl font-bold text-white">
          CollabCode
        </h1>

        <p className="mt-2 text-zinc-400">
          Real-Time Collaborative Code Editor
        </p>
      </div>

      <div className="mb-4 text-left text-white">
        <p className="text-sm text-zinc-400">Logged in as</p>
        <p className="text-lg font-semibold">{username}</p>
      </div>

      <form onSubmit={handleSubmit(handleJoinRoom)} className="space-y-5">
        <div>
          <label className="mb-2 block text-sm text-zinc-300">Room ID</label>

          <input
            {...register("roomId")}
            placeholder="Enter Room ID"
            className="w-full rounded-lg border border-white/15 bg-black px-4 py-3 text-white placeholder:text-zinc-500 outline-none focus:border-white"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-white py-3 font-semibold text-black hover:bg-zinc-200"
        >
          Join Room
        </button>
      </form>

      <div className="my-6 flex items-center">
        <div className="h-px flex-1 bg-white/15" />

        <span className="mx-3 text-sm text-zinc-400">
          OR
        </span>

        <div className="h-px flex-1 bg-white/15" />
      </div>

      <button
        onClick={handleCreateRoom}
        className="w-full rounded-lg border border-white/20 py-3 text-white hover:bg-white/10"
      >
        Create New Room
      </button>
    </div>
  );
}

export default HomeForm;
