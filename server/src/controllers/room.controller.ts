import { Request, Response } from "express";
import Room from "../models/Room";

export const createRoom = async (req: Request, res: Response) => {
  try {
    const { roomId, owner } = req.body;

    if (!roomId || !owner) {
      return res.status(400).json({
        success: false,
        message: "roomId and owner are required",
      });
    }

    const exists = await Room.findOne({ roomId });

    if (exists) {
      return res.status(409).json({
        success: false,
        message: "Room already exists",
      });
    }

    const room = await Room.create({
      roomId,
      owner,
    });

    return res.status(201).json({
      success: true,
      room,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getRoom = async (req: Request, res: Response) => {
  try {
    const { roomId } = req.params;

    const room = await Room.findOne({ roomId });

    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      });
    }

    return res.json({
      success: true,
      room,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};