import express from "express";

import { JournalEntryController } from "../controllers/JournalEntryController";

const router = express.Router();

router.post("/", JournalEntryController.create);
router.get("/", JournalEntryController.get);
router.get("/:id", JournalEntryController.getOne);
router.put("/:id", JournalEntryController.update);
router.delete("/:id", JournalEntryController.delete);

export default router;
