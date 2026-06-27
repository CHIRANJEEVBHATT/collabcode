import { z } from "zod";

export const homeSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, "Username must be at least 3 characters"),

  roomId: z
    .string()
    .trim()
    .min(1, "Room ID is required"),
});

export type HomeFormData = z.infer<typeof homeSchema>;