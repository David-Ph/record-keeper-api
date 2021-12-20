import express from "express";

import { CampaignController } from "../controllers/CampaignController";

const router = express.Router();

// create new campaign
router.post("/", CampaignController.create);

export default router;
