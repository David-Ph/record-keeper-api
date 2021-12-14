import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models";
import { AuthRequestInterface } from "../interfaces";

class Auth {
  async getToken(req: AuthRequestInterface, res: Response, next: NextFunction) {
    try {
      const data = {
        user: req.user._id,
      };

      const JWT_SECRET = process.env.JWT_SECRET;
      if (!JWT_SECRET) {
        return next({ message: "INVALID JWT KEY", statusCode: 500 });
      }

      const token = jwt.sign(data, JWT_SECRET, {
        expiresIn: "60d",
      });

      const currentUser = await User.findOne({ _id: req.user?._id }).select(
        "-password"
      );

      res.status(200).json({ token, currentUser });
    } catch (error) {
      next(error);
    }
  }

  async getMe(req: AuthRequestInterface, res: Response, next: NextFunction) {
    try {
      const data = await User.findOne({ _id: req.user._id }).select(
        "-password"
      );

      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  }
}
