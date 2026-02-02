import { Meal } from "@prisma/client";
import { prisma } from "../../lib/prisma";

const createMeal = async (payload: Meal) => {
  const result = await prisma.meal.create({
    data: payload,
  });
  return result;
};

const getAllMeal = async (query: any) => {
  const { searchTerm, category, minPrice, maxPrice, sortBy, sortOrder } = query;
  const conditions: any = [];
  if (searchTerm) {
    conditions.OR = [
      { name: { constains: searchTerm, mode: "insensitive" } },
      { description: { constains: searchTerm, mode: "insensitive" } },
    ];
  }
  if (category) {
    conditions.category = {
      name: { constains: category, mode: "insensitive" },
    };
  }
  if (minPrice || maxPrice) {
    conditions.price = {
      gte: minPrice ? Number(minPrice) : 0,
      lte: maxPrice ? Number(maxPrice) : 1000000,
    };
  }
  const result = await prisma.meal.findMany({
    where: conditions,
    include: {
      category: true,
      provider: true,
    },
    orderBy: sortBy ? { [sortBy]: sortOrder || "asc" } : { created_at: "desc" },
  });

  return result;
};

const getSingleMeal = async (id: string) => {
  const result = await prisma.meal.findUnique({
    where: {
      id,
    },
    include: {
      category: true,
      provider: true,
    },
  });
  return result;
};

const updateMeal = async (id: string, payload: Partial<Meal>) => {
  const result = await prisma.meal.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteMeal = async (id: string) => {
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
