import express from "express";

import { CategoryController } from "../controllers/CategoryController";
import { CategoryValidator } from "../middlewares/validators/CategoryValidator";

import { verifiedUser } from "../middlewares/auth/auth";

const router = express.Router();

router.post(
  "/",
  verifiedUser,
  CategoryValidator.createValidator,
  CategoryController.create
);

router.put(
  "/:id",
  verifiedUser,
  CategoryValidator.getValidator,
  CategoryValidator.updateValidator,
  CategoryController.update
);

router.get(
  "/:id",
  verifiedUser,
  CategoryValidator.getValidator,
  CategoryController.getOne
);
router.delete(
  "/:id",
  verifiedUser,
  CategoryValidator.getValidator,
  CategoryController.delete
);

router.get("/", verifiedUser, CategoryController.get);

export default router;
