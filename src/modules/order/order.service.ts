import { prisma } from "../../lib/prisma";

const createOrder = async (userId: string, payload: any) => {
  const { provider_id, items, delivery_address, total_price } = payload;

  const result = await prisma.$transaction(async (tx) => {
    const order = await tx.order.create({
      data: {
        customer: {
          connect: { id: userId },
        },
        provider: {
          connect: { id: provider_id },
        },
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
      include: {
        items: true,
      },
    });

    return order;
  });
};

const getMyOrders = async (userId: string) => {
  return await prisma.order.findMany({
    where: { customer_id: userId },
    include: { items: { include: { meal: true } } },
  });
};

const updateOrderStatus = async (orderId: string, status: any) => {
  const result = await prisma.order.update({
    where: { id: orderId },
    data: { status },
  });
  return result;
};

const deleteOrder = async (orderId: string) => {
  const result = await prisma.order.delete({
    where: { id: orderId },
  });
  return result;
};

export const OrderService = {
  createOrder,
  getMyOrders,
  updateOrderStatus,
  deleteOrder,
};
