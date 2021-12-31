import validator from "validator";
import { Types } from "mongoose";
import { Request, Response, NextFunction } from "express";

import { CategoryInterface } from "../../interfaces";
import { CategoryType } from "../../config/Options";
import { Category } from "../../models";

class Validator {
  async createValidator(
    req: Request<{}, {}, CategoryInterface>,
    res: Response,
    next: NextFunction
  ) {
    try {
      // fill out necessary fields
      // this is to avoid validator undefined error
      req.body.type = req.body.type ?? "";
      req.body.name = req.body.name ?? "";
      req.body.color = req.body.color ?? "";
      req.body.campaignId = req.body.campaignId ?? "";

      const errorMessages: string[] = [];

      if (!validator.isLength(req.body.name.toString(), { min: 1, max: 50 })) {
        errorMessages.push(
          "Category name has to be between 1 to 50 characters"
        );
      }

      if (!CategoryType.includes(req.body.type)) {
        errorMessages.push("Invalid Category Type");
      }

      if (!validator.isHexColor(req.body.color.toString())) {
        errorMessages.push("Category Color has to be hexadecimal color");
      }

      if (!Types.ObjectId.isValid(req.body.campaignId)) {
        errorMessages.push("Invalid Campaign ID");
      }

      if (req.currentUser?._id) {
        req.body.userId = req.currentUser._id;
      }

      if (!Types.ObjectId.isValid(req.body.campaignId)) {
        errorMessages.push("Invalid Campaign ID");
      }

      if (errorMessages.length > 0) {
        return next({ statusCode: 400, messages: errorMessages });
      }

      req.body.name = validator.escape(req.body.name);

      next();
    } catch (error) {
      next(error);
    }
  }

  async updateValidator(
    req: Request<{ id: string }, {}, CategoryInterface>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const findCategory = await Category.findOne({
        _id: req.params.id,
        userId: req.currentUser?._id,
      });
      if (!findCategory) {
        return next({ statusCode: 404, message: "Category not found" });
      }

      req.body.name = req.body.name ?? findCategory.name;
      req.body.color = req.body.color ?? findCategory.color;
      req.body.type = req.body.type ?? findCategory.type;

      const errorMessages: string[] = [];

      if (!validator.isLength(req.body.name.toString(), { min: 1, max: 50 })) {
        errorMessages.push(
          "Category name has to be between 1 to 50 characters"
        );
      }

      if (!CategoryType.includes(req.body.type)) {
        errorMessages.push("Invalid Category Type");
      }

      if (!validator.isHexColor(req.body.color.toString())) {
        errorMessages.push("Category Color has to be hexadecimal color");
      }

      if (req.body.userId) {
        errorMessages.push("Please do not try to edit userId");
      }

      if (req.body.campaignId) {
        errorMessages.push("Please do not try to edit campaignId");
      }

      if (req.currentUser?._id) {
        req.body.userId = req.currentUser._id;
      }

      if (errorMessages.length > 0) {
        return next({ statusCode: 400, messages: errorMessages });
      }

      req.body.name = validator.escape(req.body.name);

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

const CategoryValidator = new Validator();
export { CategoryValidator };
