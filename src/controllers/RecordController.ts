import { Request, Response, NextFunction } from "express";
import { Record } from "../models";

class RecordService {
  async get(req: Request, res: Response, next: NextFunction) {
    try {
      // pagination
      const page = +req.query.page!;
      const limit = +req.query.limit! || 15;
      const skipCount = page > 0 ? (page - 1) * limit : 0;

      // ? sorting
      const sortField = req.query.sort || "createdAt";
      const orderBy = req.query.order || "desc";

      const data = await Record.find({ userId: req.currentUser?._id })
        .sort({ [sortField as string]: orderBy })
        .limit(limit)
        .skip(skipCount)
        .lean()
        .select("-userId -categoryId -__v");

      if (data.length === 0) {
        return next({ statusCode: 404, message: "No Record Found" });
      }

      const count = await Record.count();

      res.status(200).json({ data, count });
    } catch (error) {
      next(error);
    }
  }

  async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await Record.findOne({
        _id: req.params.id,
        userId: req.currentUser?._id,
      })
        .lean()
        .select("-userId -categoryId -__v");

      if (!data) {
        return next({ statusCode: 404, message: "No Record Found" });
      }

      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await Record.create(req.body);

      res.status(201).json({ data });
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await Record.findOneAndUpdate(
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
      const data = await Record.findOneAndDelete({
        _id: req.params.id,
        userId: req.currentUser?._id,
      });

      if (!data) {
        return next({ statusCode: 404, message: "Record not found" });
      }

      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  }
}

const RecordController = new RecordService();
export { RecordController };
