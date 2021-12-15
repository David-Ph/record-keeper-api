import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models";

class Auth {
  async getToken(req: Request, res: Response, next: NextFunction) {
    try {
      const data = {
        user: req.currentUser?._id,
      };

      const JWT_SECRET = process.env.JWT_SECRET;
      if (!JWT_SECRET) {
        return next({ message: "INVALID JWT KEY", statusCode: 500 });
      }

      const token = jwt.sign(data, JWT_SECRET, {
        expiresIn: "60d",
      });

      const currentUser = await User.findOne({ _id: req.currentUser?._id }).select(
        "-password"
      );

      res.status(200).json({ token, currentUser });
    } catch (error) {
      next(error);
    }
  }

  async getMe(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await User.findOne({ _id: req.currentUser?._id }).select(
        "-password"
      );

      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  }
}

const AuthController = new Auth();
export { AuthController }