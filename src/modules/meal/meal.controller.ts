import { Request, Response } from "express";
import { MealService } from "./meal.service";

const createMeal = async (req: Request, res: Response) => {
  try {
    const result = await MealService.createMeal(req.body);
    res.status(201).json({
      success: true,
      message: "Meal created successfully",
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
    // সার্ভিস থেকে এখন meta এবং data আলাদাভাবে আসছে
    const result = await MealService.getAllMeal(req.query);
    res.status(200).json({
      success: true,
      message: "Meals retrieved successfully",
      meta: result.meta, // পেজিনেশন ডেটা
      data: result.data, // খাবারের লিস্ট
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
      message: "Meal retrieved successfully",
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
    const user = (req as any).user; // Type checking এর জন্য cast করা ভালো

    const meal = await MealService.getSingleMeal(id as string);

    // নিজের ডেটা কি না চেক করা এবং চেক শেষে return দেওয়া জরুরি
    if (!meal || meal.provider_id !== user?.id) {
      return res.status(403).json({
        success: false,
        message: "You can only update your own meals",
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
  try {
    const { id } = req.params;
    const user = (req as any).user;

    const meal = await MealService.getSingleMeal(id as string);

    if (!meal || meal.provider_id !== user?.id) {
      return res.status(403).json({
        success: false,
        message: "You can only delete your own meals",
      });
    }

    const result = await MealService.deleteMeal(id as string);
    res.status(200).json({
      success: true,
      message: "Meal deleted successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const MealController = {
  createMeal,
  getAllMeal,
  getSingleMeal,
  updateMeal,
  deleteMeal,
};
