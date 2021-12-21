import validator from "validator";
import { Request, Response, NextFunction } from "express";

import { CampaignInterface } from "../../interfaces";
import { CampaignStatus } from "../../config/Options";
import { Campaign } from "../../models";

class Validator {
  async createValidator(
    req: Request<{}, {}, CampaignInterface>,
    res: Response,
    next: NextFunction
  ) {
    try {
      // fill out necessary fields
      // this is to avoid validator undefined error
      req.body.title = req.body.title ?? "";
      req.body.status = req.body.status ?? "";
      req.body.dungeonMaster = req.body.dungeonMaster ?? "Dungeon Master";
      req.body.description =
        req.body.description ?? "Adventurers doing some adventure.";

      const errorMessages: string[] = [];

      if (!validator.isLength(req.body.title.toString(), { min: 1, max: 50 })) {
        errorMessages.push("Title should be between 1 to 50 characters");
      }

      if (validator.isEmpty(req.body.status.toString())) {
        errorMessages.push("Status should not be empty");
      }

      if (!CampaignStatus.includes(req.body.status.toString())) {
        errorMessages.push(
          "Invalid status. Choose between [On Going, Completed, Finished, On Going]"
        );
      }

      if (
        !validator.isLength(req.body.dungeonMaster.toString(), {
          min: 1,
          max: 50,
        })
      ) {
        errorMessages.push(
          "Dungeon Master should be between 1 to 50 characters"
        );
      }

      if (
        !validator.isLength(req.body.description.toString(), {
          min: 1,
          max: 150,
        })
      ) {
        errorMessages.push("Description should be between 1 to 150 characters");
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
    req: Request<{ id: string }, {}, CampaignInterface>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const findCampaign = await Campaign.findOne({
        _id: req.params.id,
        userId: req.currentUser?._id,
      });
      if (!findCampaign) {
        return next({ statusCode: 404, message: "Campaign not found" });
      }

      req.body.title = req.body.title ?? findCampaign.title;
      req.body.status = req.body.status ?? findCampaign.status;
      req.body.dungeonMaster =
        req.body.dungeonMaster ?? findCampaign.dungeonMaster;
      req.body.description = req.body.description ?? findCampaign.description;

      const errorMessages: string[] = [];

      if (!validator.isLength(req.body.title.toString(), { min: 1, max: 50 })) {
        errorMessages.push("Title should be between 1 to 50 characters");
      }

      if (validator.isEmpty(req.body.status.toString())) {
        errorMessages.push("Status should not be empty");
      }

      if (!CampaignStatus.includes(req.body.status.toString())) {
        errorMessages.push(
          "Invalid status. Choose between [On Going, Completed, Finished, On Going]"
        );
      }

      if (
        !validator.isLength(req.body.dungeonMaster.toString(), {
          min: 0,
          max: 50,
        })
      ) {
        errorMessages.push(
          "Dungeon Master should be between 0 to 50 characters"
        );
      }

      if (
        !validator.isLength(req.body.description.toString(), {
          min: 0,
          max: 150,
        })
      ) {
        errorMessages.push("Description should be between 0 to 150 characters");
      }

      if (req.body.userId) {
        errorMessages.push("Please do not try to edit userId");
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

const CampaignValidator = new Validator();
export { CampaignValidator };
