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

      const currentUser = await User.findOne({
        _id: req.currentUser?._id,
      }).select("-password");

      res.status(200).json({ token, currentUser });
    } catch (error) {
      next(error);
    }
  }

  async getMe(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await User.findOne({ _id: req.currentUser?._id }).select(
        "-password -isVerified -verificationCode"
      );

      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  }

  async verifyCode(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await User.findOne({ _id: req.params.id }).select(
        "-password"
      );

      if (!data) {
        return next({ statusCode: 404, message: "User not found" });
      }

      if (req.params.code !== data.verificationCode) {
        return next({ statusCode: 400, message: "Invalid verification code" });
      }

      data.isVerified = true;
      await data.save();

      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  }
}

const AuthController = new Auth();
export { AuthController };
