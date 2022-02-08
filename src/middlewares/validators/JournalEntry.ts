import validator from "validator";
import striptags from "striptags";
import { getExcerptFromString } from "../../lib/functions";

import { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";

import { JournalEntryInterface, QueryInterface } from "../../interfaces";
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
      req.body.title = req.body.title || "";
      req.body.body = req.body.body || "";
      req.body.campaignId = req.body.campaignId || "";

      const errorMessages: string[] = [];

      if (!validator.isLength(req.body.title.toString(), { min: 1, max: 50 })) {
        errorMessages.push("Title should be between 1 to 50 characters");
      }

      if (!Types.ObjectId.isValid(req.body.campaignId)) {
        errorMessages.push("Invalid Campaign ID");
      }

      if (req.currentUser?._id) {
        req.body.userId = req.currentUser._id;
      }

      if (errorMessages.length > 0) {
        return next({ statusCode: 400, messages: errorMessages });
      }

      const strippedText = striptags(req.body.body);

      req.body.excerpt = getExcerptFromString(strippedText);

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
      const findJournalEntry = await JournalEntry.findOne({
        _id: req.params.id,
        userId: req.currentUser?._id,
      });
      if (!findJournalEntry) {
        return next({ statusCode: 404, message: "Campaign not found" });
      }

      req.body.title = req.body.title || findJournalEntry.title;
      req.body.body = req.body.body || findJournalEntry.body;

      const errorMessages: string[] = [];

      if (req.body.userId) {
        errorMessages.push("Please do not try to edit userId");
      }

      if (req.body.campaignId) {
        errorMessages.push("Please do not try to edit campaignId");
      }

      if (!validator.isLength(req.body.title.toString(), { min: 1, max: 50 })) {
        errorMessages.push("Title should be between 1 to 50 characters");
      }

      if (!Types.ObjectId.isValid(req.body.campaignId)) {
        errorMessages.push("Invalid Campaign ID");
      }

      if (errorMessages.length > 0) {
        return next({ statusCode: 400, messages: errorMessages });
      }

      const strippedText = striptags(req.body.body);

      req.body.excerpt = getExcerptFromString(strippedText);

      next();
    } catch (error) {
      next(error);
    }
  }

  async getValidator(
    req: Request<{ id: string }, {}, {}, QueryInterface>,
    res: Response,
    next: NextFunction
  ) {
    try {
      if (req.params.id) {
        if (!Types.ObjectId.isValid(req.params.id)) {
          return next({ statusCode: 400, message: "Invalid id" });
        }
      }

      if (req.query.campaignId) {
        if (!Types.ObjectId.isValid(req.query.campaignId)) {
          return next({ statusCode: 400, message: "Invalid id" });
        }
      }
      next();
    } catch (error) {
      next(error);
    }
  }
}

const JournalEntryValidator = new Validator();
export { JournalEntryValidator };
