import mongoose from "mongoose";
import { CampaignInterface, CampaignStatus } from "../interfaces";

const CampaignSchema = new mongoose.Schema<CampaignInterface>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID Can't be empty"],
    },
    title: {
      type: String,
      required: [true, "Campaign title can't be empty"],
      trim: true
    },
    status: {
      type: String,
      enum: [
        CampaignStatus.Completed,
        CampaignStatus.Dropped,
        CampaignStatus.Finished,
        CampaignStatus.Ongoing,
      ],
      required: [true, "Campaign status can't be empty"],
    },
    dungeonMaster: {
      type: String,
      default: "Dungeon Master",
      trim: true
    },
    description: {
      type: String,
      default: "Adventurers doing some adventure.",
      trim: true
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

const Campaign = mongoose.model<CampaignInterface>("Campaign", CampaignSchema);

export { Campaign };
