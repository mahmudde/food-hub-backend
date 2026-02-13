"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProviderRoutes = void 0;
const express_1 = __importDefault(require("express"));
const provider_controller_1 = require("./provider.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const auth_2 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
router.post("/create-profile", (0, auth_1.default)(client_1.UserRole.PROVIDER), provider_controller_1.ProviderController.createProviderProfile);
router.get("/profile", (0, auth_2.default)(client_1.UserRole.PROVIDER), provider_controller_1.ProviderController.getProviderProfile);
exports.ProviderRoutes = router;
