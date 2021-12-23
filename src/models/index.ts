import * as dotenv from "dotenv";
import mongoose, { ConnectOptions } from "mongoose";

const MONGO_URI: string = process.env.MONGO_URI ?? "";

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions)
  .then(() => console.log("Connected to MongoDB!"))
  .catch((err) => console.log(err));

export { User } from "./User";
export { Campaign } from "./Campaign";
export { JournalEntry } from "./JournalEntry";
export { Record } from "./Record";
export { Category } from "./Category";
