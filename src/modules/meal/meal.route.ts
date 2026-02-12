import express from "express";
import { MealController } from "./meal.controller";
import authMiddleware from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.post(
  "/create-meal",
  authMiddleware(UserRole.PROVIDER),
  MealController.createMeal,
);
router.get("/", MealController.getAllMeal);
router.patch(
  "/:id",
  authMiddleware(UserRole.PROVIDER),
  MealController.updateMeal,
);
router.delete("/:id", authMiddleware(), MealController.deleteMeal);

export const MealRoutes = router;
