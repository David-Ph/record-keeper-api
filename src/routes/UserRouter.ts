import express from "express";

import {register, login} from "../middlewares/auth/auth";
import {AuthController} from "../controllers/AuthController";

const router = express.Router();

router.post('register', register, AuthController.getToken);
