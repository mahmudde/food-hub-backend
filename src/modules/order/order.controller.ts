import { Request, Response } from "express";
import { OrderService } from "./order.service";

const createOrder = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const userId = user?.id || user?.userId;

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const result = await OrderService.createOrder(userId, req.body);

    res.status(201).json({
      success: true,
      message: "Order placed successfully! 🎉",
      data: result,
    });
  } catch (error: any) {
    console.error("Order Error:", error);
    res.status(error.status || 500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const userId = user?.id || user?.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Your session expired. Please login again",
      });
    }

    const result = await OrderService.getAllOrders(req.query);

    res.status(200).json({
      success: true,
      message: "Orders fetched successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
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

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized! User information not found in request.",
      });
    }
    const userId = user.id || user.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User ID is missing from the token.",
      });
    }

    const result = await OrderService.getMyOrders(userId);

    res.status(200).json({
      success: true,
      message: "Orders retrieved successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
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

const cancelOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = (req as any).user;
    const userId = user?.id || user?.userId;

    const result = await OrderService.cancelOrder(id as string, userId);

    res.status(200).json({
      success: true,
      message: "Order cancelled successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to cancel order",
    });
  }
};

const getProviderOrders = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;

    if (!user || user.role !== "PROVIDER") {
      return res.status(403).json({
        success: false,
        message: "Forbidden: Only providers can access this.",
      });
    }

    const result = await OrderService.getProviderOrders(user.id);

    res.status(200).json({
      success: true,
      message: "Provider orders retrieved successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};
const updateStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const result = await OrderService.updateOrderStatus(id as string, status);

    res.status(200).json({
      success: true,
      message: `Order status updated to ${status}`,
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

export const OrderController = {
  createOrder,
  getAllOrders,
  getDashboardStats,
  getMyOrders,
  trackOrder,
  cancelOrder,
  getProviderOrders,
  updateStatus,
};
