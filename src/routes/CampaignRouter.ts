import express from "express";

import { CampaignController } from "../controllers/CampaignController";
import { CampaignValidator } from "../middlewares/validators/CampaignValidator";

import { verifiedUser } from "../middlewares/auth/auth";

const router = express.Router();

router.post(
  "/",
  verifiedUser,
  CampaignValidator.createValidator,
  CampaignController.create
);

router.put(
  "/:id",
  verifiedUser,
  CampaignValidator.getValidator,
  CampaignValidator.updateValidator,
  CampaignController.update
);

router.get(
  "/:id",
  verifiedUser,
  CampaignValidator.getValidator,
  CampaignController.getOne
);
router.delete(
  "/:id",
  verifiedUser,
  CampaignValidator.getValidator,
  CampaignController.delete
);

router.get("/", verifiedUser, CampaignController.get);

export default router;
