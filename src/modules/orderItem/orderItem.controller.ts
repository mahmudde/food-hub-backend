import { Request, Response } from "express";
import { OrderItemService } from "./orderItem.service";

const getItemsByOrderId = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;
    const result = await OrderItemService.getItemsByOrderId(orderId as string);
    res
      .status(200)
      .json({
        success: true,
        message: "Items retrived successfully",
        data: result,
      });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteOrderItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await OrderItemService.deleteOrderItem(id as string);
    res
      .status(200)
      .json({ success: true, message: "Item deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const OrderItemController = {
  getItemsByOrderId,
  deleteOrderItem,
};
