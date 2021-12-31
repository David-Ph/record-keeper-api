import { Request, Response, NextFunction } from "express";
import { Category } from "../models";

class CategoryService {
  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await Category.find({ userId: req.currentUser?._id })
        .lean()
        .select("-userId -campaignId -__v");

      if (data.length === 0) {
        return next({ statusCode: 404, message: "No Category Found" });
      }

      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  }

  async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await Category.findOne({
        _id: req.params.id,
        userId: req.currentUser?._id,
      })
        .lean()
        .select("-campaignId -userId -_-v");

      if (!data) {
        return next({ statusCode: 404, message: "No Category Found" });
      }

      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await Category.create(req.body);

      res.status(201).json({ data });
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await Category.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        req.body,
        { new: true }
      )
        .lean()
        .select("-userId -campaignId");

      res.status(201).json({ data });
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await Category.findOneAndDelete({
        _id: req.params.id,
        userId: req.currentUser?._id,
      });

      if (!data) {
        return next({ statusCode: 404, message: "Category not found" });
      }

      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  }
}

const CategoryController = new CategoryService();
export { CategoryController };
