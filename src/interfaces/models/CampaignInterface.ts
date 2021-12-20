import { Document, Types } from "mongoose";

enum CampaignStatus {
  Completed = "Completed",
  Ongoing = "On Going",
  Dropped = "Dropped",
  Finished = "Finished",
}

export interface CampaignInterface extends Document {
  _id: Types.ObjectId;
  userId: { type: Types.ObjectId; ref: "User" };
  title: string;
  status: CampaignStatus;
  dungeonMaster?: string;
  description?: string;
}
