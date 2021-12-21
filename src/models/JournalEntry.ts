import mongoose from "mongoose";
import { JournalEntryInterface } from "../interfaces";

const JournalEntrySchema = new mongoose.Schema<JournalEntryInterface>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID Can't be empty"],
    },
    campaignId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Campaign",
      required: [true, "Campaign ID Can't be empty"],
    },
    title: {
      type: String,
      required: [true, "Journal Entry Title can't be empty"],
      trim: true
    },
    body: {
      type: String,
      required: [true, "Journal Entry Body can't be empty"],
      trim: true
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
