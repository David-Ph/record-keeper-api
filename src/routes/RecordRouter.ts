import express from "express";

import { RecordController } from "../controllers/RecordController";
import { RecordValidator } from "../middlewares/validators/RecordValidator";

import { verifiedUser } from "../middlewares/auth/auth";

const router = express.Router();

router.post(
  "/",
  verifiedUser,
  RecordValidator.createValidator,
  RecordController.create
);

router.put(
  "/:id",
  verifiedUser,
  RecordValidator.getValidator,
  RecordValidator.updateValidator,
  RecordController.update
);

router.get(
  "/:id",
  verifiedUser,
  RecordValidator.getValidator,
  RecordController.getOne
);
router.delete(
  "/:id",
  verifiedUser,
  RecordValidator.getValidator,
  RecordController.delete
);

router.get("/", verifiedUser, RecordController.get);

export default router;
