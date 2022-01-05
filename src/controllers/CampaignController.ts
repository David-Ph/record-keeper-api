import { Request, Response, NextFunction } from "express";
import { Campaign } from "../models";
import { QueryInterface } from "../interfaces";

class CampaignService {
  async get(
    req: Request<{}, {}, {}, QueryInterface>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const query: any = {
        userId: req.currentUser?._id,
      };

      if (req.query.status) query.status = req.query.status;

      if (req.query.search)
        query.$or = [
          { title: new RegExp(req.query.search, "i") },
          { description: new RegExp(req.query.search, "i") },
          { dungeonMaster: new RegExp(req.query.search, "i") },
        ];

      // pagination
      const page = +req.query.page!;
      const limit = +req.query.limit! || 15;
      const skipCount = page > 0 ? (page - 1) * limit : 0;

      // sorting
      const sortField = req.query.sort || "createdAt";
      const orderBy = req.query.order || "desc";

      const data = await Campaign.find(query)
        .sort({ [sortField as string]: orderBy })
        .limit(limit)
        .skip(skipCount)
        .lean()
        .select("-userId -__v");

      if (data.length === 0) {
        return next({ statusCode: 404, message: "No Campaign Found" });
      }

      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  }

  async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await Campaign.findOne({
        _id: req.params.id,
        userId: req.currentUser?._id,
      })
        .lean()
        .select("-userId -__v");

      if (!data) {
        return next({ statusCode: 404, message: "No Campaign Found" });
      }

      res.status(200).json({ data });
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
      const data = await Campaign.findOneAndDelete({
        _id: req.params.id,
        userId: req.currentUser?._id,
      });

      if (!data) {
        return next({ statusCode: 404, message: "Campaign not found" });
      }

      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  }
}

const CampaignController = new CampaignService();
export { CampaignController };
