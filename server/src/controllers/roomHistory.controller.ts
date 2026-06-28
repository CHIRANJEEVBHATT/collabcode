import { Request, Response } from "express";
import RoomHistory from "../models/RoomHistory";

export const saveRoomHistory = async (req: Request, res: Response) => {
  try {
    const { roomId, latestCode, language } = req.body;

    const history = await RoomHistory.findOneAndUpdate(
      { roomId },
      {
        latestCode,
        language,
      },
      {
        upsert: true,
        new: true,
      }
    );

    return res.status(200).json({
      success: true,
      history,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to save room history",
    });
  }
};

export const getRoomHistory = async (req: Request, res: Response) => {
  try {
    const { roomId } = req.params;

    const history = await RoomHistory.findOne({ roomId });

    return res.status(200).json({
      success: true,
      history,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch room history",
    });
  }
};