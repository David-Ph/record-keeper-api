import express from "express";

import { register, login, authenticateUser } from "../middlewares/auth/auth";
import { AuthController } from "../controllers/AuthController";

const router = express.Router();

router.post("/register", register, AuthController.getToken);
router.post("/login", login, AuthController.getToken);
router.get("/user", authenticateUser, AuthController.getMe);

export default router;
