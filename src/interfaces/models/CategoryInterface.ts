import { Document, Types } from "mongoose";

export enum CategoryType {
  People = "People",
  Locations = "Locations",
  Equipments = "Equipments",
  Items = "Items",
  Notes = "Notes",
  Tasks = "Tasks",
  Events = "Events",
  Misc = "Misc",
}

export interface CategoryInterface extends Document {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  campaignId: Types.ObjectId;
  type: CategoryType;
  name: string;
  color: string;
}
