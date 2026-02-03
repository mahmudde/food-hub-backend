import { prisma } from "../../lib/prisma";

const getItemsByOrderId = async (orderId: string) => {
  return await prisma.orderItem.findMany({
    where: { order_id: orderId },
    include: { meal: true },
  });
};

const deleteOrderItem = async (id: string) => {
  return await prisma.orderItem.delete({
    where: { id },
  });
};

const updateOrderItem = async (id: string, quantity: number) => {
  return await prisma.orderItem.update({
    where: { id },
    data: { quantity },
  });
};

export const OrderItemService = {
  getItemsByOrderId,
  deleteOrderItem,
  updateOrderItem,
};
