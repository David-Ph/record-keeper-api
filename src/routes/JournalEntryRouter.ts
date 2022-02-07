import express from "express";

import { JournalEntryController } from "../controllers/JournalEntryController";
import { JournalEntryValidator } from "../middlewares/validators/JournalEntry";

import { verifiedUser } from "../middlewares/auth/auth";

const router = express.Router();

router.post(
  "/",
  verifiedUser,
  JournalEntryValidator.createValidator,
  JournalEntryController.create
);

router.put(
  "/:id",
  verifiedUser,
  JournalEntryValidator.updateValidator,
  JournalEntryController.update
);

router.get(
  "/",
  verifiedUser,
  JournalEntryValidator.getValidator,
  JournalEntryController.get
);
router.get(
  "/:id",
  verifiedUser,
  JournalEntryValidator.getValidator,
  JournalEntryController.getOne
);
router.delete("/:id", verifiedUser, JournalEntryController.delete);

export default router;
