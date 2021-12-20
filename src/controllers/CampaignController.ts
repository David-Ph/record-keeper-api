import { Request, Response, NextFunction } from "express";
import { Campaign } from "../models";

class CampaignService {
  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const newData = await Campaign.findOneAndUpdate(
        {
          _id: req.currentUser?._id,
        },
        req.body,
        { new: true }
      );

      res.status(201).json({ newData });
    } catch (error) {
      next(error);
    }
  }

  async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const newData = await Campaign.findOneAndUpdate(
        {
          _id: req.currentUser?._id,
        },
        req.body,
        { new: true }
      );

      res.status(201).json({ newData });
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const newData = await Campaign.create(req.body);

      res.status(201).json({ newData });
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const newData = await Campaign.findOneAndUpdate(
        {
          _id: req.currentUser?._id,
        },
        req.body,
        { new: true }
      );

      res.status(201).json({ newData });
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const newData = await Campaign.findOneAndUpdate(
        {
          _id: req.currentUser?._id,
        },
        req.body,
        { new: true }
      );

      res.status(201).json({ newData });
    } catch (error) {
      next(error);
    }
  }
}

const CampaignController = new CampaignService();
export { CampaignController };
