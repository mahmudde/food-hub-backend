import { Request, Response } from "express";
import { OrderService } from "./order.service";

const createOrder = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const result = await OrderService.createOrder(user.id, req.body);

    res.status(201).json({
      success: true,
      message: "Order hasbeen created successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getMyOrders = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const result = await OrderService.getMyOrders(user.id);

    res.status(200).json({
      success: true,
      message: "Your orders retrived successfully",
      count: result.length,
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const result = await OrderService.updateOrderStatus(id as string, status);

    res.status(200).json({
      success: true,
      message: "Order status has benn updated",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await OrderService.deleteOrder(id as string);

    res.status(200).json({
      success: true,
      message: "Order has been deleted",
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const OrderController = {
  createOrder,
  getMyOrders,
  updateOrderStatus,
  deleteOrder,
};
