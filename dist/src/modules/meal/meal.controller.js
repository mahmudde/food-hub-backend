"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MealController = void 0;
const meal_service_1 = require("./meal.service");
const prisma_1 = require("../../lib/prisma");
const createMeal = async (req, res) => {
    try {
        const user = req.user;
        const result = await meal_service_1.MealService.createMeal(user.id, req.body);
        res.status(201).json({
            success: true,
            message: "Meal created successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
const getAllMeal = async (req, res) => {
    try {
        const result = await meal_service_1.MealService.getAllMeal(req.query);
        res.status(200).json({
            success: true,
            message: "Meals retrieved successfully",
            meta: result.meta,
            data: result.data,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
const getSingleMeal = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await meal_service_1.MealService.getSingleMeal(id);
        res.status(200).json({
            success: true,
            message: "Meal retrieved successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
const updateMeal = async (req, res) => {
    try {
        const { id } = req.params;
        const user = req.user;
        const providerProfile = await prisma_1.prisma.providerProfile.findUnique({
            where: { user_id: user.id || user.userId },
        });
        if (!providerProfile) {
            return res.status(404).json({
                success: false,
                message: "Provider profile not found!",
            });
        }
        const meal = await meal_service_1.MealService.getSingleMeal(id);
        if (!meal) {
            return res.status(404).json({
                success: false,
                message: "Meal not found!",
            });
        }
        if (meal.provider_id !== providerProfile.id) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to update this meal!",
            });
        }
        if (req.body.price)
            req.body.price = Number(req.body.price);
        const result = await meal_service_1.MealService.updateMeal(id, req.body);
        res.status(200).json({
            success: true,
            message: "Meal updated successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
const deleteMeal = async (req, res) => {
    try {
        const { id } = req.params;
        const user = req.user;
        const providerProfile = await prisma_1.prisma.providerProfile.findUnique({
            where: { user_id: user.id || user.userId },
        });
        if (!providerProfile) {
            return res.status(404).json({
                success: false,
                message: "Provider profile not found!",
            });
        }
        const meal = await meal_service_1.MealService.getSingleMeal(id);
        if (!meal) {
            return res.status(404).json({
                success: false,
                message: "Meal not found!",
            });
        }
        if (meal.provider_id !== providerProfile.id) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to delete this meal!",
            });
        }
        const result = await meal_service_1.MealService.deleteMeal(id);
        res.status(200).json({
            success: true,
            message: "Meal deleted successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error",
        });
    }
};
exports.MealController = {
    createMeal,
    getAllMeal,
    getSingleMeal,
    updateMeal,
    deleteMeal,
};
