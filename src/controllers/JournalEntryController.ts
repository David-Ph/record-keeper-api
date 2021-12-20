import { Request, Response, NextFunction } from "express";
import { JournalEntry } from "../models";

class JournalEntryService {
  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await JournalEntry.find();

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
      const data = await JournalEntry.findOne({ _id: req.params.id });

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
      const data = await JournalEntry.findOneAndDelete({ _id: req.params.id });

      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  }
}

const JournalEntryController = new JournalEntryService();
export { JournalEntryController };
