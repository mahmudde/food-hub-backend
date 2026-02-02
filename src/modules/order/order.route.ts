import express from "express";
import { OrderController } from "./order.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = express.Router();

// --- Customer Routes ---

router.post(
  "/place-order",
  auth(UserRole.CUSTOMER),
  OrderController.createOrder,
);

router.get("/my-orders", auth(UserRole.CUSTOMER), OrderController.getMyOrders);

// --- Provider & Admin Routes ---

router.patch(
  "/:id/status",
  auth(UserRole.PROVIDER, UserRole.ADMIN),
  OrderController.updateOrderStatus,
);

// --- Admin Only Routes ---

router.delete("/:id", auth(UserRole.ADMIN), OrderController.deleteOrder);

export const OrderRoutes = router;
