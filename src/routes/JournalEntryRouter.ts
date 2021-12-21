import express from "express";

import { JournalEntryController } from "../controllers/JournalEntryController";

import { verifiedUser } from "../middlewares/auth/auth";

const router = express.Router();

router.post("/", verifiedUser, JournalEntryController.create);
router.get("/", verifiedUser, JournalEntryController.get);
router.get("/:id", verifiedUser, JournalEntryController.getOne);
router.put("/:id", verifiedUser, JournalEntryController.update);
router.delete("/:id", verifiedUser, JournalEntryController.delete);

export default router;
