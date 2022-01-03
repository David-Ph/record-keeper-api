import { Request, Response, NextFunction } from "express";
import { JournalEntry } from "../models";
import { QueryInterface } from "../interfaces";

class JournalEntryService {
  async get(
    req: Request<{}, {}, {}, QueryInterface>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const query: any = {
        userId: req.currentUser?._id,
      };

      if (req.query.search)
        query.$or = [
          { title: new RegExp(req.query.search, "i") },
          { body: new RegExp(req.query.search, "i") },
        ];

      // pagination
      const page = +req.query.page;
      const limit = +req.query.limit || 15;
      const skipCount = page > 0 ? (page - 1) * limit : 0;

      // sorting
      const sortField = req.query.sort || "createdAt";
      const orderBy = req.query.order || "desc";

      const data = await JournalEntry.find(query)
        .sort({ [sortField as string]: orderBy })
        .limit(limit)
        .skip(skipCount)
        .lean()
        .select("-userId -campaignId -__v");

      if (data.length === 0) {
        return next({ statusCode: 404, message: "No JournalEntry Found" });
      }

      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  }

  async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await JournalEntry.findOne({
        _id: req.params.id,
        userId: req.currentUser?._id,
      })
        .lean()
        .select("-userId -campaignId -__v");

      if (!data) {
        return next({ statusCode: 404, message: "No Journal Entry Found" });
      }

      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await JournalEntry.create(req.body);

      res.status(201).json({ data });
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await JournalEntry.findOneAndUpdate(
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
      const data = await JournalEntry.findOneAndDelete({
        _id: req.params.id,
        userId: req.currentUser?._id,
      });

      if (!data) {
        return next({ statusCode: 404, message: "Journal Entry not found" });
      }

      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  }
}

const JournalEntryController = new JournalEntryService();
export { JournalEntryController };
