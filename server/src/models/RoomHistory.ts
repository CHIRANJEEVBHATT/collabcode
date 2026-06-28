import { Schema, model, Document } from "mongoose";

export interface IRoomHistory extends Document {
  roomId: string;
  latestCode: string;
  language: string;
}

const roomHistorySchema = new Schema<IRoomHistory>(
  {
    roomId: {
      type: String,
      required: true,
      unique: true,
    },
    latestCode: {
      type: String,
      default: "",
    },
    language: {
      type: String,
      default: "javascript",
    },
  },
  {
    timestamps: true,
  }
);

export default model<IRoomHistory>("RoomHistory", roomHistorySchema);