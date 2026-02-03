import { Request, Response } from "express";
import { OrderService } from "./order.service";

const createOrder = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const result = await OrderService.createOrder(user.id, req.body);
    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const result = await OrderService.getAllOrders(req.query);
    res.status(200).json({ success: true, data: result });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getDashboardStats = async (req: Request, res: Response) => {
  try {
    const result = await OrderService.getDashboardStats();
    res.status(200).json({ success: true, data: result });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getMyOrders = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const result = await OrderService.getMyOrders(user.id);
    res.status(200).json({ success: true, data: result });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const trackOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await OrderService.trackOrder(id as string);

    res.status(200).json({
      success: true,
      message: "Order tracking information retrieved successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message || "Order not found",
    });
  }
};

export const OrderController = {
  createOrder,
  getAllOrders,
  getDashboardStats,
  getMyOrders,
  trackOrder,
};
