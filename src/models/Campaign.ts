import mongoose, { Types } from "mongoose";
import { CampaignInterface, CampaignStatus } from "../interfaces";

const CampaignSchema = new mongoose.Schema<CampaignInterface>(
  {
    userId: {
      type: Types.ObjectId,
      ref: "User",
      required: [true, "User ID Can't be empty"],
    },
    title: {
      type: String,
      required: [true, "Campaign title can't be empty"],
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
    },
    description: {
      type: String,
      default: "Adventurers doing some adventure.",
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
