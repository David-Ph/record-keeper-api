import express from "express";

import { CampaignController } from "../controllers/CampaignController";

const router = express.Router();

// create new campaign
router.post("/", CampaignController.create);
router.get("/", CampaignController.get);
router.get("/:id", CampaignController.getOne);
router.put("/:id", CampaignController.update);
router.delete("/:id", CampaignController.delete);

export default router;
