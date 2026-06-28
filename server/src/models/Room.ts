import { Schema, model, Document } from "mongoose";

export interface IRoom extends Document {
  roomId: string;
  owner: string;
  createdAt: Date;
  updatedAt: Date;
}

const roomSchema = new Schema<IRoom>(
  {
    roomId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    owner: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model<IRoom>("Room", roomSchema);