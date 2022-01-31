import { Request, Response, NextFunction } from "express";
import { UserInterface } from "../../interfaces";
import validator from "validator";
import { User } from "../../models";

class Validator {
  async register(
    req: Request<{}, {}, UserInterface>,
    res: Response,
    next: NextFunction
  ) {
    try {
      // fill out necessary fields
      // this is to avoid validator undefined error
      req.body.username = req.body.username || "";
      req.body.email = req.body.email || "";
      req.body.password = req.body.password || "";
      req.body.verificationCode = req.body.verificationCode || "";

      const errorMessages: string[] = [];

      if (
        !validator.isAlphanumeric(req.body.username, "en-US", { ignore: "_-" })
      ) {
        errorMessages.push(
          "Invalid username. Should only contain alphanumeric or '-' and '_'"
        );
      }

      if (!validator.isLength(req.body.username, { min: 3, max: 25 })) {
        errorMessages.push("Username has to be between 3 to 25 characters");
      }

      if (!validator.isEmpty(req.body.verificationCode.toString())) {
        errorMessages.push(
          "Invalid request body: verificationCode is forbidden"
        );
      }

      if (
        req.body.isVerified &&
        !validator.isEmpty(req.body.isVerified.toString())
      ) {
        errorMessages.push("Invalid request body: isVerified is forbidden");
      }

      if (validator.isEmpty(req.body.email.toString())) {
        errorMessages.push("Email should not be empty");
      }

      if (validator.isEmpty(req.body.password.toString())) {
        errorMessages.push("Password should not be empty");
      }

      if (
        !validator.isStrongPassword(req.body.password, {
          minLength: 6,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 0,
          minSymbols: 0,
        })
      ) {
        errorMessages.push(
          "Password has to contain at least 6 characters, 1 uppercase and 1 lowercase"
        );
      }

      if (!validator.isEmail(req.body.email)) {
        errorMessages.push("Invalid email");
      }

      if (errorMessages.length > 0) {
        return next({ statusCode: 400, messages: errorMessages });
      }

      next();
    } catch (error) {
      next(error);
    }
  }

  async login(
    req: Request<{}, {}, UserInterface>,
    res: Response,
    next: NextFunction
  ) {
    try {
      // fill out necessary fields
      // this is to avoid validator undefined error
      req.body.email = req.body.email || "";
      req.body.password = req.body.password || "";

      const errorMessages: string[] = [];

      if (validator.isEmpty(req.body.email.toString())) {
        errorMessages.push("Email should not be empty");
      }

      if (validator.isEmpty(req.body.password.toString())) {
        errorMessages.push("Password should not be empty");
      }

      if (!validator.isEmail(req.body.email)) {
        errorMessages.push("Invalid email");
      }

      if (errorMessages.length > 0) {
        return next({ statusCode: 400, messages: errorMessages });
      }

      next();
    } catch (error) {
      next(error);
    }
  }

  async update(
    req: Request<{ id: string }, {}, UserInterface>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const findUser = await User.findOne({ _id: req.currentUser?.id });
      if (!findUser) {
        return next({ statusCode: 404, message: "User not found" });
      }
      //   this is to ensure that blank body will not replace previous data
      req.body.username = req.body.username || findUser.username;
      req.body.email = req.body.email || findUser.email;
      req.body.avatar = req.body.avatar || findUser.avatar;
      req.body.verificationCode = findUser.verificationCode;
      req.body.isVerified = findUser.isVerified;

      const errorMessages: string[] = [];

      if (!validator.isEmail(req.body.email)) {
        errorMessages.push("Invalid email");
      }

      if (
        !validator.isAlphanumeric(req.body.username, "en-US", { ignore: "_-" })
      ) {
        errorMessages.push(
          "Invalid username. Should only contain alphanumeric or '-' and '_'"
        );
      }

      if (!validator.isLength(req.body.username, { min: 3, max: 25 })) {
        errorMessages.push("Username has to be between 3 to 25 characters");
      }

      if (
        !validator.isStrongPassword(req.body.password, {
          minLength: 6,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 0,
          minSymbols: 0,
        })
      ) {
        errorMessages.push(
          "Password has to contain at least 6 characters, 1 uppercase and 1 lowercase"
        );
      }

      if (req.file) {
        if (!req.file.mimetype.startsWith("image") || req.file.size > 3000000) {
          errorMessages.push("File must be an image and less than 3MB");
        } else {
          req.body.avatar = req.file.path;
        }
      }

      if (errorMessages.length > 0) {
        return next({ statusCode: 400, messages: errorMessages });
      }

      next();
    } catch (error) {
      next(error);
    }
  }
}

const UserValidator = new Validator();
export { UserValidator };
