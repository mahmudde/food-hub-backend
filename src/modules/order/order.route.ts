import express from "express";
import { OrderController } from "./order.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.get(
  "/dashboard-stats",
  auth(UserRole.ADMIN, UserRole.PROVIDER),
  OrderController.getDashboardStats,
);

router.get("/all-orders", auth(UserRole.ADMIN), OrderController.getAllOrders);

router.get("/my-orders", auth(UserRole.CUSTOMER), OrderController.getMyOrders);

router.post("/", auth(UserRole.CUSTOMER), OrderController.createOrder);

router.get(
  "/track/:id",
  auth(UserRole.CUSTOMER, UserRole.ADMIN),
  OrderController.trackOrder,
);

export const OrderRoutes = router;
