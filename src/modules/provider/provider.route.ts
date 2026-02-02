import express from "express";
import { ProviderController } from "./provider.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.post(
  "/create-profile",
  auth(UserRole.PROVIDER),
  ProviderController.createProviderProfile,
);

export const ProviderRoutes = router;
