import express from "express";
import multer from "multer";

import { register, login, authenticateUser } from "../middlewares/auth/auth";
import { AuthController } from "../controllers/AuthController";
import { UserValidator } from "../middlewares/validators/UserValidator";
import { cloudinary, storage } from "../config/Cloudinary";

const router = express.Router();
const parser = multer({ storage });

router.post(
  "/register",
  UserValidator.register,
  register,
  AuthController.getToken
);

router.post("/login", UserValidator.login, login, AuthController.getToken);
router.get("/user", authenticateUser, AuthController.getMe);
router.put("/edit", parser.single("avatar"), UserValidator.update);

export default router;
