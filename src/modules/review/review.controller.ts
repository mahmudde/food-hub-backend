import { Request, Response } from "express";
import { ReviewService } from "./review.service";

const createReview = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const result = await ReviewService.createReview(user.id, req.body);

    res.status(201).json({
      success: true,
      message: "Your review added successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getMealReviews = async (req: Request, res: Response) => {
  try {
    const { mealId } = req.params;
    const result = await ReviewService.getMealReviews(mealId as string);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const ReviewController = { createReview, getMealReviews };
