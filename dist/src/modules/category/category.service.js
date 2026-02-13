"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
const prisma_1 = require("../../lib/prisma");
const createCategory = async (data) => {
    const result = await prisma_1.prisma.category.create({
        data,
    });
    return result;
};
const getAllCategories = async () => {
    return await prisma_1.prisma.category.findMany({
        include: { _count: { select: { meals: true } } },
    });
};
exports.CategoryService = {
    createCategory,
    getAllCategories,
};
