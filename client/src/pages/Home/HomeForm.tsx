import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { v4 as uuid } from "uuid";
import toast from "react-hot-toast";
import { Code2 } from "lucide-react";

import { createRoom, getRoom } from "@/services/api";

const schema = z.object({
  username: z
    .string()
    .trim()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be at most 20 characters"),

  roomId: z.string().trim().optional(),
});

type HomeFormData = z.infer<typeof schema>;

function HomeForm() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<HomeFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: "",
      roomId: "",
    },
  });

  useEffect(() => {
    const saved = localStorage.getItem("username");

    if (saved) {
      setValue("username", saved);
    }
  }, [setValue]);

  const username = watch("username");

  const handleJoinRoom = async (data: HomeFormData) => {
  console.log("1. Form submitted:", data);

  if (!data.roomId?.trim()) {
    toast.error("Please enter a Room ID");
    return;
  }

  try {
    console.log("2. Checking room...");

    const room = await getRoom(data.roomId);

    console.log("3. Room response:", room);

    localStorage.setItem("username", data.username);

    console.log("4. Navigating...");

    navigate(`/editor/${data.roomId}`, {
      state: {
        username: data.username,
      },
    });
  } catch (err) {
    console.error("Join failed:", err);
    toast.error(err instanceof Error ? err.message : "Failed to join room");
  }
};

  const handleCreateRoom = async () => {
    if (username.trim().length < 3) {
      toast.error("Enter a valid username");
      return;
    }

    const roomId = uuid();

    try {
      await createRoom(roomId, username);

      localStorage.setItem("username", username);

      toast.success("Room created");

      navigate(`/editor/${roomId}`, {
        state: {
          username,
        },
      });
    } catch (err: any) {
      toast.error(err.message);
    }
  };

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

      <form onSubmit={handleSubmit(handleJoinRoom)} className="space-y-5">
        <div>
          <label className="mb-2 block text-sm text-slate-300">
            Username
          </label>

          <input
            {...register("username")}
            placeholder="Enter username"
            className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-blue-500"
          />

          {errors.username && (
            <p className="mt-1 text-sm text-red-400">
              {errors.username.message}
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm text-slate-300">
            Room ID
          </label>

          <input
            {...register("roomId")}
            placeholder="Enter Room ID"
            className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700"
        >
          Join Room
        </button>
      </form>

      <div className="my-6 flex items-center">
        <div className="h-px flex-1 bg-slate-700" />

        <span className="mx-3 text-sm text-slate-400">
          OR
        </span>

        <div className="h-px flex-1 bg-slate-700" />
      </div>

      <button
        onClick={handleCreateRoom}
        className="w-full rounded-lg border border-slate-700 py-3 text-white hover:bg-slate-800"
      >
        Create New Room
      </button>
    </div>
  );
}

export default HomeForm;