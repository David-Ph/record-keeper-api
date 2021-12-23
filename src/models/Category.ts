import mongoose from "mongoose";
import { CategoryInterface, CategoryType } from "../interfaces";

const CategorySchema = new mongoose.Schema<CategoryInterface>(
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
    name: {
      type: String,
      required: [true, "Category name can't be empty"],
      trim: true,
    },
    type: {
      type: String,
      enum: [
        CategoryType.Equipments,
        CategoryType.Events,
        CategoryType.Items,
        CategoryType.Locations,
        CategoryType.Misc,
        CategoryType.Notes,
        CategoryType.People,
        CategoryType.Tasks,
      ],
      required: [true, "Campaign status can't be empty"],
    },
    color: {
      type: String,
      default: "#fde59b",
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

const Category = mongoose.model<CategoryInterface>("Category", CategorySchema);

export { Category };
