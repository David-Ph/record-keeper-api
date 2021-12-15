import { Request, Response, NextFunction } from "express";
import { User } from "../models";

class UserService {
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const newData = await User.findOneAndUpdate(
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

const UserController = new UserService();
export { UserController };
