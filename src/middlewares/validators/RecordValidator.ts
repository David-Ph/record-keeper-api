import validator from "validator";
import { Types } from "mongoose";
import { Request, Response, NextFunction } from "express";

import { RecordInterface, QueryInterface } from "../../interfaces";
import { RecordStatus } from "../../config/Options";
import { Record } from "../../models";

class Validator {
  async createValidator(
    req: Request<{}, {}, RecordInterface>,
    res: Response,
    next: NextFunction
  ) {
    try {
      // fill out necessary fields
      // this is to avoid validator undefined error
      req.body.categoryId = req.body.categoryId || "";
      req.body.title = req.body.title || "";
      req.body.description = req.body.description || "";
      req.body.status = req.body.status || "";

      const errorMessages: string[] = [];

      if (!Types.ObjectId.isValid(req.body.categoryId)) {
        errorMessages.push("Invalid Category ID");
      }

      if (!validator.isLength(req.body.title.toString(), { min: 1, max: 50 })) {
        errorMessages.push(
          "Category title has to be between 1 to 50 characters"
        );
      }

      if (
        !validator.isLength(req.body.description.toString(), {
          min: 0,
          max: 300,
        })
      ) {
        errorMessages.push(
          "Category desciption has to be between 0 to 300 characters"
        );
      }

      if (!RecordStatus.includes(req.body.status)) {
        errorMessages.push("Invalid status");
      }

      req.body.title = validator.escape(req.body.title);
      req.body.description = validator.escape(req.body.description);

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
    req: Request<{ id: string }, {}, RecordInterface>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const findRecord = await Record.findOne({
        _id: req.params.id,
        userId: req.currentUser?._id,
      });
      if (!findRecord) {
        return next({ statusCode: 404, message: "Record not found" });
      }
      // fill out necessary fields
      // this is to avoid validator undefined error
      req.body.title = req.body.title || findRecord.title;
      req.body.description = req.body.description || findRecord.description;
      req.body.status = req.body.status || findRecord.status;

      const errorMessages: string[] = [];

      if (!validator.isLength(req.body.title.toString(), { min: 1, max: 50 })) {
        errorMessages.push(
          "Category title has to be between 1 to 50 characters"
        );
      }

      if (
        !validator.isLength(req.body.description.toString(), {
          min: 0,
          max: 300,
        })
      ) {
        errorMessages.push(
          "Category desciption has to be between 0 to 300 characters"
        );
      }

      if (!RecordStatus.includes(req.body.status)) {
        errorMessages.push("Invalid status");
      }

      if (req.body.userId) {
        errorMessages.push("Please do not try to edit userId");
      }

      if (req.body.categoryId) {
        errorMessages.push("Please do not try to edit categoryId");
      }

      req.body.title = validator.escape(req.body.title);
      req.body.description = validator.escape(req.body.description);

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

const RecordValidator = new Validator();
export { RecordValidator };
