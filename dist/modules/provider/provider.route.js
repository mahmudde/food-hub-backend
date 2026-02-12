import express from "express";
import { ProviderController } from "./provider.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import authMiddleware from "../../middlewares/auth";
const router = express.Router();
router.post("/create-profile", auth(UserRole.PROVIDER), ProviderController.createProviderProfile);
router.get("/profile", authMiddleware(UserRole.PROVIDER), ProviderController.getProviderProfile);
export const ProviderRoutes = router;
