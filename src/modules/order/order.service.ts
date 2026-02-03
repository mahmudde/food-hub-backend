import { prisma } from "../../lib/prisma";

const createOrder = async (userId: string, payload: any) => {
  const { provider_id, items, delivery_address, total_price } = payload;

  if (!items || !Array.isArray(items)) {
    throw new Error("Order item not found");
  }

  return await prisma.$transaction(async (tx) => {
    const order = await tx.order.create({
      data: {
        customer: { connect: { id: userId } },
        provider: { connect: { id: provider_id } },
        delivery_address,
        total_price,
        status: "PLACED",
        items: {
          create: items.map((item: any) => ({
            meal_id: item.meal_id,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: { items: true },
    });
    return order;
  });
};

const getAllOrders = async (query: any) => {
  const { page = 1, limit = 10 } = query;
  const skip = (Number(page) - 1) * Number(limit);

  const result = await prisma.order.findMany({
    skip,
    take: Number(limit),
    include: {
      items: { include: { meal: true } },
      customer: true,
    },
    orderBy: { created_at: "desc" },
  });

  const total = await prisma.order.count();

  return {
    meta: { page: Number(page), limit: Number(limit), total },
    data: result,
  };
};

const getDashboardStats = async () => {
  const totalOrders = await prisma.order.count();
  const totalRevenue = await prisma.order.aggregate({
    _sum: { total_price: true },
  });
  const totalMeals = await prisma.meal.count();

  return {
    totalOrders,
    totalRevenue: totalRevenue._sum.total_price || 0,
    totalMeals,
  };
};

const getMyOrders = async (userId: string) => {
  return await prisma.order.findMany({
    where: { customer_id: userId },
    include: { items: { include: { meal: true } } },
    orderBy: { created_at: "desc" },
  });
};

const updateOrderStatus = async (orderId: string, status: any) => {
  return await prisma.order.update({
    where: { id: orderId },
    data: { status },
  });
};

const deleteOrder = async (orderId: string) => {
  return await prisma.order.delete({
    where: { id: orderId },
  });
};

const trackOrder = async (orderId: string) => {
  const result = await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      provider: {
        select: {
          resturant_name: true,
        },
      },
      items: {
        include: {
          meal: true,
        },
      },
    },
  });

  if (!result) {
    throw new Error("No order found");
  }

  return result;
};

export const OrderService = {
  createOrder,
  getAllOrders,
  getMyOrders,
  getDashboardStats,
  updateOrderStatus,
  deleteOrder,
  trackOrder,
};
