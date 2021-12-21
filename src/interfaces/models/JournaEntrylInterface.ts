import { Document, Types } from "mongoose";

export interface JournalEntryInterface extends Document {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  campaignId: Types.ObjectId;
  title: string;
  body: string;
  slug: string;
  excerpt: string;
}
