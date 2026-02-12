import { prisma } from "../../lib/prisma";

const createOrder = async (userId: string, payload: any) => {
  const { provider_id, items, delivery_address, total_price, payment_method } =
    payload;

  if (!items || !Array.isArray(items) || items.length === 0) {
    throw new Error("Order items are missing or invalid");
  }

  return await prisma.$transaction(async (tx) => {
    const order = await tx.order.create({
      data: {
        customer_id: userId,
        provider_id: provider_id,
        delivery_address: delivery_address,
        total_price: total_price,
        payment_method: payment_method || "CASH_ON_DELIVERY",
        status: "PLACED",
        items: {
          create: items.map((item: any) => ({
            meal_id: item.id || item.meal_id,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: {
        items: true,
      },
    });

    return order;
  });
};

const getAllOrders = async (query: any) => {
  const { page = 1, limit = 10 } = query;
  const skip = (Number(page) - 1) * Number(limit);
  const take = Number(limit);

  const [result, total] = await Promise.all([
    prisma.order.findMany({
      skip,
      take,
      include: {
        items: { include: { meal: true } },
        customer: true,
      },
      orderBy: { created_at: "desc" },
    }),
    prisma.order.count(),
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
    include: {
      items: {
        include: { meal: true },
      },
      provider: {
        select: {
          resturant_name: true,
        },
      },
    },
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

const cancelOrder = async (orderId: string, userId: string) => {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
  });

  if (!order) {
    throw new Error("Order not found");
  }
  if (order.customer_id !== userId) {
    throw new Error("You are not authorized to cancel this order");
  }
  if (order.status !== "PLACED") {
    throw new Error(`Cannot cancel order. Current status is ${order.status}`);
  }
  return await prisma.order.update({
    where: { id: orderId },
    data: { status: "CANCELLED" },
  });
};

const getProviderOrders = async (providerId: string) => {
  return await prisma.order.findMany({
    where: {
      provider_id: providerId,
    },
    include: {
      customer: {
        select: {
          name: true,
          email: true,
        },
      },
      items: {
        include: {
          meal: true,
        },
      },
    },
  });
};

const updateOrderStatus = async (orderId: string, status: string) => {
  return await prisma.order.update({
    where: {
      id: orderId,
    },
    data: {
      status: status as any,
    },
  });
};

export const OrderService = {
  createOrder,
  getAllOrders,
  getMyOrders,
  getDashboardStats,
  deleteOrder,
  trackOrder,
  cancelOrder,
  getProviderOrders,
  updateOrderStatus,
};
