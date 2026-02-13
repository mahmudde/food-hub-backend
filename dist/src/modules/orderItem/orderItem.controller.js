"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderItemController = void 0;
const orderItem_service_1 = require("./orderItem.service");
const getItemsByOrderId = async (req, res) => {
    try {
        const { orderId } = req.params;
        const result = await orderItem_service_1.OrderItemService.getItemsByOrderId(orderId);
        res
            .status(200)
            .json({
            success: true,
            message: "Items retrived successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
const deleteOrderItem = async (req, res) => {
    try {
        const { id } = req.params;
        await orderItem_service_1.OrderItemService.deleteOrderItem(id);
        res
            .status(200)
            .json({ success: true, message: "Item deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.OrderItemController = {
    getItemsByOrderId,
    deleteOrderItem,
};
