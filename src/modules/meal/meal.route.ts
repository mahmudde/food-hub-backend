import express from "express";
import { MealController } from "./meal.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.post("/create-meal", auth(UserRole.PROVIDER), MealController.createMeal);
router.get("/", MealController.getAllMeal);
router.patch("/:id", auth(UserRole.PROVIDER), MealController.updateMeal);
router.delete("/:id", auth(UserRole.PROVIDER), MealController.deleteMeal);

export const MealRoutes = router;
