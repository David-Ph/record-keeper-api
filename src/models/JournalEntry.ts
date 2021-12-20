import mongoose, { Types } from "mongoose";
import { JournalEntryInterface } from "../interfaces";

const JournalEntrySchema = new mongoose.Schema<JournalEntryInterface>(
  {
    userId: {
      type: Types.ObjectId,
      ref: "User",
      required: [true, "User ID Can't be empty"],
    },
    campaignId: {
      type: Types.ObjectId,
      ref: "Campaign",
      required: [true, "Campaign ID Can't be empty"],
    },
    title: {
      type: String,
      required: [true, "Journal Entry Title can't be empty"],
    },
    body: {
      type: String,
      required: [true, "Journal Entry Body can't be empty"],
    },
    excerpt: {
      type: String,
      required: [true, "Journal Entry Excerpt can't be empty"],
    },
    slug: {
      type: String,
      required: [true, "Journal Entry Slug can't be empty"],
      unique: true,
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

const JournalEntry = mongoose.model<JournalEntryInterface>(
  "JournalEntry",
  JournalEntrySchema
);

export { JournalEntry };
