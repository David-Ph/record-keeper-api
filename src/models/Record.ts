import mongoose from "mongoose";
import { RecordInterface, RecordStatus } from "../interfaces";

const RecordSchema = new mongoose.Schema<RecordInterface>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID Can't be empty"],
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category ID Can't be empty"],
    },
    title: {
      type: String,
      required: [true, "Record title can't be empty"],
      trim: true,
    },
    status: {
      type: String,
      enum: [
        RecordStatus.Normal,
        RecordStatus.Important,
        RecordStatus.Archived,
      ],
      required: [true, "Campaign status can't be empty"],
    },
    description: {
      type: String,
      default: "Amazing adventure today!",
      trim: true,
    },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
    toJSON: {
      versionKey: false,
    },
  }
);

const Record = mongoose.model<RecordInterface>("Record", RecordSchema);

export { Record };
