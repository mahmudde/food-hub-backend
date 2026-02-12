import { OrderItemService } from "./orderItem.service";
const getItemsByOrderId = async (req, res) => {
    try {
        const { orderId } = req.params;
        const result = await OrderItemService.getItemsByOrderId(orderId);
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
        await OrderItemService.deleteOrderItem(id);
        res
            .status(200)
            .json({ success: true, message: "Item deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
export const OrderItemController = {
    getItemsByOrderId,
    deleteOrderItem,
};
