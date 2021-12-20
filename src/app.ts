//? Import dependencies
import path from "path";
import * as dotenv from "dotenv";
dotenv.config({
  path: path.join(__dirname, `../.env.${process.env.NODE_ENV}`),
});

import express, { Request, Response, NextFunction } from "express";

//? Import Files
import errorHandler from "./middlewares/errorHandler/errorHandler";
import UserRouter from "./routes/UserRouter";
import CampaignRouter from "./routes/CampaignRouter";
import JournalEntryRouter from "./routes/JournalEntryRouter";

//? Express Settings
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`App running on port ${PORT} ${process.env.NODE_ENV} server`)
);
