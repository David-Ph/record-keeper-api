import validator from "validator";
import { Request, Response, NextFunction } from "express";

import { JournalEntryInterface } from "../../interfaces";
import { JournalEntry } from "../../models";

class Validator {
  async createValidator(
    req: Request<{}, {}, JournalEntryInterface>,
    res: Response,
    next: NextFunction
  ) {
    try {
      // fill out necessary fields
      // this is to avoid validator undefined error
      req.body.title = req.body.title ?? "";
      req.body.body = req.body.body ?? "";
      req.body.campaignId = req.body.campaignId ?? "";

      const errorMessages: string[] = [];

      if (!validator.isLength(req.body.title.toString(), { min: 1, max: 50 })) {
        errorMessages.push("Title should be between 1 to 50 characters");
      }

      if (req.currentUser?._id) {
        req.body.userId = req.currentUser._id;
      }

      if (errorMessages.length > 0) {
        return next({ statusCode: 400, messages: errorMessages });
      }

      next();
    } catch (error) {
      next(error);
    }
  }

  async updateValidator(
    req: Request<{ id: string }, {}, JournalEntryInterface>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const errorMessages: string[] = [];

      if (req.body.userId) {
        errorMessages.push("Please do not try to edit userId");
      }

      if (req.body.campaignId) {
        errorMessages.push("Please do not try to edit campaignId");
      }

      if (errorMessages.length > 0) {
        return next({ statusCode: 400, messages: errorMessages });
      }

      next();
    } catch (error) {
      next(error);
    }
  }
}

const JournalEntryValidator = new Validator();
export { JournalEntryValidator };
