import { Document, Types } from "mongoose";

export interface JournalEntryInterface extends Document {
  _id: Types.ObjectId;
  userId: { type: Types.ObjectId; ref: "User" };
  campaignId: { type: Types.ObjectId; ref: "Campaign" };
  title: string;
  body: string;
  slug: string;
  excerpt: string;
}
