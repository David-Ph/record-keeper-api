import validator from "validator";
import { Types } from "mongoose";
import { Request, Response, NextFunction } from "express";

import { RecordInterface } from "../../interfaces";
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

      const errorMessages: string[] = [];

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
      const errorMessages: string[] = [];

      if (errorMessages.length > 0) {
        return next({ statusCode: 400, messages: errorMessages });
      }

      next();
    } catch (error) {
      next(error);
    }
  }

  async getValidator(
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
  ) {
    try {
      if (!Types.ObjectId.isValid(req.params.id)) {
        return next({ statusCode: 400, message: "Invalid id" });
      }
      next();
    } catch (error) {
      next(error);
    }
  }
}

const RecordValidator = new Validator();
export { RecordValidator };
