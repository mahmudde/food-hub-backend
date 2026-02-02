import { Request, Response } from "express";
import { MealService } from "./meal.service";

const createMeal = async (req: Request, res: Response) => {
  try {
    const result = await MealService.createMeal(req.body);
    res.status(201).json({
      success: true,
      message: " Meal created successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllMeal = async (req: Request, res: Response) => {
  try {
    const result = await MealService.getAllMeal(req.query);
    res.status(200).json({
      success: true,
      message: "Meals retrived successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getSingleMeal = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await MealService.getSingleMeal(id as string);
    res.status(200).json({
      success: true,
      message: "Meal retrive successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateMeal = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = req.user;
    const meal = await MealService.getSingleMeal(id as string);
    if (!meal || meal.provider_id !== user?.id) {
      res.status(403).json({
        success: false,
        message: "You can only update your data",
      });
    }
    const result = await MealService.updateMeal(id as string, req.body);
    res.status(200).json({
      success: true,
      message: "Meal updated successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteMeal = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = req.user;
  const meal = await MealService.getSingleMeal(id as string);
  if (!meal || meal.provider_id !== user?.id) {
    res.status(403).json({
      success: false,
      message: "You can dele only your own data",
    });
  }
  const result = await MealService.deleteMeal(id as string);
  res.status(200).json({
    success: true,
    message: "Meal deleted successfully",
    data: result,
  });
};

export const MealController = {
  createMeal,
  getAllMeal,
  getSingleMeal,
  updateMeal,
  deleteMeal,
};
