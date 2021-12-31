import { Document, Types } from "mongoose";

export enum RecordStatus {
  Normal = "Normal",
  Important = "Important",
  Archived = "Archived",
}

export interface RecordInterface extends Document {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  categoryId: Types.ObjectId;
  title: string;
  description: string;
  status: RecordStatus;
}
