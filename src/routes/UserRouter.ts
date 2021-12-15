import express from "express";

import { register, login, authenticateUser } from "../middlewares/auth/auth";
import { AuthController } from "../controllers/AuthController";
import { UserValidator } from "../middlewares/validators/UserValidator";

const router = express.Router();

router.post(
  "/register",
  UserValidator.register,
  register,
  AuthController.getToken
);

router.post("/login", UserValidator.login, login, AuthController.getToken);
router.get("/user", authenticateUser, AuthController.getMe);

export default router;
