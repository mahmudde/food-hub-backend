import { prisma } from "../../lib/prisma";

const createCategory = async (data: { name: string; slug: string }) => {
  const result = await prisma.category.create({
    data,
  });
  return result;
};

const getAllCategories = async () => {
  return await prisma.category.findMany({
    include: { _count: { select: { meals: true } } },
  });
};

export const CategoryService = {
  createCategory,
  getAllCategories,
};
