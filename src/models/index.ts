import * as dotenv from "dotenv";
import mongoose, { ConnectOptions } from "mongoose";

dotenv.config({ path: __dirname + `/.env.${process.env.NODE_ENV}` });

const MONGO_URI: string = process.env.MONGO_URI ?? "";

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions)
  .then(() => console.log("Connected to MongoDB!"))
  .catch((err) => console.log(err));
