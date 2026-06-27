import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { v4 as uuid } from "uuid";
import toast from "react-hot-toast";

import { homeSchema, HomeFormData } from "./schema";

export function useHome() {
  const navigate = useNavigate();

  const form = useForm<HomeFormData>({
    resolver: zodResolver(homeSchema),
    defaultValues: {
      username: "",
      roomId: "",
    },
  });

  const createRoom = () => {
    const id = uuid();

    form.setValue("roomId", id);

    toast.success("Room ID generated!");
  };

  const joinRoom = (data: HomeFormData) => {
    navigate(`/editor/${data.roomId}`, {
      state: {
        username: data.username,
      },
    });
  };

  return {
    form,
    createRoom,
    joinRoom,
  };
}