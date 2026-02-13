"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderItemService = void 0;
const prisma_1 = require("../../lib/prisma");
const getItemsByOrderId = async (orderId) => {
    return await prisma_1.prisma.orderItem.findMany({
        where: { order_id: orderId },
        include: { meal: true },
    });
};
const deleteOrderItem = async (id) => {
    return await prisma_1.prisma.orderItem.delete({
        where: { id },
    });
};
const updateOrderItem = async (id, quantity) => {
    return await prisma_1.prisma.orderItem.update({
        where: { id },
        data: { quantity },
    });
};
exports.OrderItemService = {
    getItemsByOrderId,
    deleteOrderItem,
    updateOrderItem,
};
