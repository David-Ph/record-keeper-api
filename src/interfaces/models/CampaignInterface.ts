import { Document, Types } from "mongoose";

export enum CampaignStatus {
  Completed = "Completed",
  Ongoing = "On Going",
  Dropped = "Dropped",
  Finished = "Finished",
}

export interface CampaignInterface extends Document {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  title: string;
  status: CampaignStatus;
  dungeonMaster: string;
  description: string;
}
