"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryController = void 0;
const category_service_1 = require("./category.service");
const createCategory = async (req, res) => {
    try {
        const result = await category_service_1.CategoryService.createCategory(req.body);
        res.status(201).json({
            success: true,
            message: "Category created successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
const getAllCategories = async (req, res) => {
    try {
        const result = await category_service_1.CategoryService.getAllCategories();
        res.status(200).json({
            success: true,
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.CategoryController = {
    createCategory,
    getAllCategories,
};
