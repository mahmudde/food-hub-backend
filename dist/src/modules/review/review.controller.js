"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewController = void 0;
const review_service_1 = require("./review.service");
const createReview = async (req, res) => {
    try {
        const user = req.user;
        const result = await review_service_1.ReviewService.createReview(user.id, req.body);
        res.status(201).json({
            success: true,
            message: "Your review added successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
const getMealReviews = async (req, res) => {
    try {
        const { mealId } = req.params;
        const result = await review_service_1.ReviewService.getMealReviews(mealId);
        res.status(200).json({
            success: true,
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.ReviewController = { createReview, getMealReviews };
