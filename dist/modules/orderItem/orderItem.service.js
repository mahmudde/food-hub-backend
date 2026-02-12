import { prisma } from "../../lib/prisma";
const getItemsByOrderId = async (orderId) => {
    return await prisma.orderItem.findMany({
        where: { order_id: orderId },
        include: { meal: true },
    });
};
const deleteOrderItem = async (id) => {
    return await prisma.orderItem.delete({
        where: { id },
    });
};
const updateOrderItem = async (id, quantity) => {
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
