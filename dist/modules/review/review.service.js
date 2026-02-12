import { prisma } from "../../lib/prisma";
const createReview = async (userId, payload) => {
    return await prisma.review.create({
        data: {
            user_id: userId,
            meal_id: payload.meal_id,
            rating: Number(payload.rating),
            comment: payload.comment,
        },
        include: {
            meal: true,
            user: true,
        },
    });
};
const getMealReviews = async (mealId) => {
    return await prisma.review.findMany({
        where: { meal_id: mealId },
        include: {
            user: {
                select: { name: true, email: true },
            },
        },
        orderBy: { createdAt: "desc" },
    });
};
export const ReviewService = {
    createReview,
    getMealReviews,
};
