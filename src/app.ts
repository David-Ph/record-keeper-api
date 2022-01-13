//? Import dependencies
import path from "path";
import * as dotenv from "dotenv";
dotenv.config({
  path: path.join(__dirname, `../.env.${process.env.NODE_ENV}`),
});

import express, { Request, Response, NextFunction } from "express";
import fs from "fs";
import mongoSanitize from "express-mongo-sanitize";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";

//? Import Files
import errorHandler from "./middlewares/errorHandler/errorHandler";
import UserRouter from "./routes/UserRouter";
import CampaignRouter from "./routes/CampaignRouter";
import JournalEntryRouter from "./routes/JournalEntryRouter";
import CategoryRouter from "./routes/CategoryRouter";
import RecordRouter from "./routes/RecordRouter";

//? Express Settings
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 mins
  max: 100,
});
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(mongoSanitize());
app.use(limiter);
app.use(helmet({ contentSecurityPolicy: false }));
if (process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test") {
  app.use(morgan("dev"));
} else {
  // create a write stream (in append mode)
  let accessLogStream = fs.createWriteStream(
    path.join(__dirname, "access.log"),
    {
      flags: "a",
    }
  );

  // setup the logger
  app.use(morgan("combined", { stream: accessLogStream }));
}

//? Set Routes
app.get("/api/v1/check", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    info: "Health check okay!",
    environment: `${process.env.NODE_ENV}`,
  });
});

app.use("/api/v1/auth", UserRouter);
app.use("/api/v1/campaign", CampaignRouter);
app.use("/api/v1/journal", JournalEntryRouter);
app.use("/api/v1/category", CategoryRouter);
app.use("/api/v1/record", RecordRouter);

app.all("*", async (req, res, next) => {
  try {
    next({
      messages: "Page you're looking for is not found",
      statusCode: 404,
    });
  } catch (error) {
    next(error);
  }
});

app.use(errorHandler);

if (process.env.NODE_ENV !== "test") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () =>
    console.log(`App running on port ${PORT} ${process.env.NODE_ENV} server`)
  );
}

export default app;
