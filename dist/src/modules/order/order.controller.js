"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const order_service_1 = require("./order.service");
const createOrder = async (req, res) => {
    try {
        const user = req.user;
        const userId = user?.id || user?.userId;
        if (!userId) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }
        const result = await order_service_1.OrderService.createOrder(userId, req.body);
        res.status(201).json({
            success: true,
            message: "Order placed successfully! 🎉",
            data: result,
        });
    }
    catch (error) {
        console.error("Order Error:", error);
        res.status(error.status || 500).json({
            success: false,
            message: error.message || "Internal Server Error",
        });
    }
};
const getAllOrders = async (req, res) => {
    try {
        const user = req.user;
        const userId = user?.id || user?.userId;
        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Your session expired. Please login again",
            });
        }
        const result = await order_service_1.OrderService.getAllOrders(req.query);
        res.status(200).json({
            success: true,
            message: "Orders fetched successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error",
        });
    }
};
const getDashboardStats = async (req, res) => {
    try {
        const result = await order_service_1.OrderService.getDashboardStats();
        res.status(200).json({ success: true, data: result });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
const getMyOrders = async (req, res) => {
    try {
        const user = req.user;
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
        const result = await order_service_1.OrderService.getMyOrders(userId);
        res.status(200).json({
            success: true,
            message: "Orders retrieved successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error",
        });
    }
};
const trackOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await order_service_1.OrderService.trackOrder(id);
        res.status(200).json({
            success: true,
            message: "Order tracking information retrieved successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: error.message || "Order not found",
        });
    }
};
const cancelOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const user = req.user;
        const userId = user?.id || user?.userId;
        const result = await order_service_1.OrderService.cancelOrder(id, userId);
        res.status(200).json({
            success: true,
            message: "Order cancelled successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message || "Failed to cancel order",
        });
    }
};
const getProviderOrders = async (req, res) => {
    try {
        const user = req.user;
        if (!user || user.role !== "PROVIDER") {
            return res.status(403).json({
                success: false,
                message: "Forbidden: Only providers can access this.",
            });
        }
        const result = await order_service_1.OrderService.getProviderOrders(user.id);
        res.status(200).json({
            success: true,
            message: "Provider orders retrieved successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error",
        });
    }
};
const updateStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const result = await order_service_1.OrderService.updateOrderStatus(id, status);
        res.status(200).json({
            success: true,
            message: `Order status updated to ${status}`,
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error",
        });
    }
};
exports.OrderController = {
    createOrder,
    getAllOrders,
    getDashboardStats,
    getMyOrders,
    trackOrder,
    cancelOrder,
    getProviderOrders,
    updateStatus,
};
