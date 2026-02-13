"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const address_controller_1 = require("./address.controller");
const router = express_1.default.Router();
router.post("/", (0, auth_1.default)(client_1.UserRole.CUSTOMER), address_controller_1.AddressController.createAddress);
router.get("/", (0, auth_1.default)(client_1.UserRole.CUSTOMER), address_controller_1.AddressController.getMyAddresses);
router.patch("/:id", (0, auth_1.default)(client_1.UserRole.CUSTOMER), address_controller_1.AddressController.updateAddress);
router.delete("/:id", (0, auth_1.default)(client_1.UserRole.CUSTOMER), address_controller_1.AddressController.deleteAddress);
exports.AddressRoutes = router;
