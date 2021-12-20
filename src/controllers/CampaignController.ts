import { Request, Response, NextFunction } from "express";
import { Campaign } from "../models";

class CampaignService {
  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await Campaign.find();

      if (!data.length) {
        return next({ statusCode: 404, message: "No Campaign Found" });
      }

      res.status(201).json({ data });
    } catch (error) {
      next(error);
    }
  }

  async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await Campaign.findOne({ _id: req.params.id });

      res.status(201).json({ data });
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await Campaign.create(req.body);

      res.status(201).json({ data });
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await Campaign.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        req.body,
        { new: true }
      );

      res.status(201).json({ data });
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await Campaign.findOneAndDelete({ _id: req.params.id });

      res.status(201).json({ data });
    } catch (error) {
      next(error);
    }
  }
}

const CampaignController = new CampaignService();
export { CampaignController };
