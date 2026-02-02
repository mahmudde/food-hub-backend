import express from "express";
import { MealController } from "./meal.controller";

const router = express.Router();

router.post("/create-meal", MealController.createMeal);
router.get("/", MealController.getAllMeal);
router.post("/create-meal", MealController.createMeal);
router.patch("/:id", MealController.updateMeal);
router.delete("/:id", MealController.deleteMeal);

export const MealRoutes = router;
