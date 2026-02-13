"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderItemRoutes = void 0;
const express_1 = __importDefault(require("express"));
const orderItem_controller_1 = require("./orderItem.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
router.get("/:orderId", (0, auth_1.default)(client_1.UserRole.CUSTOMER, client_1.UserRole.PROVIDER, client_1.UserRole.ADMIN), orderItem_controller_1.OrderItemController.getItemsByOrderId);
router.delete("/:id", (0, auth_1.default)(client_1.UserRole.ADMIN), orderItem_controller_1.OrderItemController.deleteOrderItem);
exports.OrderItemRoutes = router;
