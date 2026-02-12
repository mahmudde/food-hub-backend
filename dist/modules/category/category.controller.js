import { CategoryService } from "./category.service";
const createCategory = async (req, res) => {
    try {
        const result = await CategoryService.createCategory(req.body);
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
        const result = await CategoryService.getAllCategories();
        res.status(200).json({
            success: true,
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
export const CategoryController = {
    createCategory,
    getAllCategories,
};
