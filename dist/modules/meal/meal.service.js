import { prisma } from "../../lib/prisma";
const createMeal = async (userId, payload) => {
    const provider = await prisma.providerProfile.findUnique({
        where: { user_id: userId },
    });
    if (!provider) {
        throw new Error("You must have a provider profile to add meals!");
    }
    const result = await prisma.meal.create({
        data: {
            name: payload.name,
            description: payload.description,
            price: Number(payload.price),
            image_url: payload.image_url || "https://example.com/default.jpg",
            is_available: "AVAILABLE",
            category_id: payload.category_id,
            provider_id: provider.id,
        },
    });
    return result;
};
const getAllMeal = async (query) => {
    const { searchTerm, category, minPrice, maxPrice, sortBy, sortOrder, page = 1, limit = 10, } = query;
    // Pagination calculation
    const skip = (Number(page) - 1) * Number(limit);
    const take = Number(limit);
    // Search and Filter conditions
    const conditions = {};
    if (searchTerm) {
        conditions.OR = [
            { name: { contains: searchTerm, mode: "insensitive" } },
            { description: { contains: searchTerm, mode: "insensitive" } },
        ];
    }
    if (category) {
        conditions.category = {
            name: { contains: category, mode: "insensitive" },
        };
    }
    if (minPrice || maxPrice) {
        conditions.price = {
            gte: minPrice ? Number(minPrice) : 0,
            lte: maxPrice ? Number(maxPrice) : 1000000,
        };
    }
    // Fetching data and total count for meta
    const [result, total] = await Promise.all([
        prisma.meal.findMany({
            where: conditions,
            skip,
            take,
            include: {
                category: true,
                provider: true,
            },
            orderBy: sortBy
                ? { [sortBy]: sortOrder || "asc" }
                : { created_at: "desc" },
        }),
        prisma.meal.count({ where: conditions }),
    ]);
    return {
        meta: {
            page: Number(page),
            limit: take,
            total,
            totalPage: Math.ceil(total / take),
        },
        data: result,
    };
};
const getSingleMeal = async (id) => {
    const result = await prisma.meal.findUnique({
        where: { id },
        include: {
            category: true,
            provider: true,
        },
    });
    return result;
};
const updateMeal = async (id, payload) => {
    const { id: _, ...updateData } = payload;
    if (updateData.price) {
        updateData.price = Number(updateData.price);
    }
    const result = await prisma.meal.update({
        where: {
            id: id,
        },
        data: updateData,
    });
    return result;
};
const deleteMeal = async (id) => {
    const result = await prisma.meal.delete({
        where: { id },
    });
    return result;
};
export const MealService = {
    createMeal,
    getAllMeal,
    getSingleMeal,
    updateMeal,
    deleteMeal,
};
