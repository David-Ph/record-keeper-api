import express from "express";
import multer from "multer";

import { register, login, verifiedUser } from "../middlewares/auth/auth";
import { AuthController } from "../controllers/AuthController";
import { UserController } from "../controllers/UserController";
import { UserValidator } from "../middlewares/validators/UserValidator";
import { storage } from "../config/Cloudinary";

const router = express.Router();
const parser = multer({ storage });

// register new user
router.post(
  "/register",
  UserValidator.register,
  register,
  AuthController.getToken
);

// login user
router.post("/login", UserValidator.login, login, AuthController.getToken);

// get current user data
router.get("/user", verifiedUser, AuthController.getMe);

// edit current user profile
router.put(
  "/edit",
  parser.single("avatar"),
  verifiedUser,
  UserValidator.update,
  UserController.update
);

// verify user
router.get("/verify/:id/:code", AuthController.verifyCode);

export default router;
