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
  CampaignValidator.update,
  CampaignController.update
);

router.get("/", verifiedUser, CampaignController.get);
router.get("/:id", verifiedUser, CampaignController.getOne);
router.delete("/:id", verifiedUser, CampaignController.delete);



export default router;
