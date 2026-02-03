import express from "express";
import { OrderItemController } from "./orderItem.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.get(
  "/:orderId",
  auth(UserRole.CUSTOMER, UserRole.PROVIDER, UserRole.ADMIN),
  OrderItemController.getItemsByOrderId,
);

router.delete(
  "/:id",
  auth(UserRole.ADMIN),
  OrderItemController.deleteOrderItem,
);

export const OrderItemRoutes = router;
