"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MealRoutes = void 0;
const express_1 = __importDefault(require("express"));
const meal_controller_1 = require("./meal.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
router.post("/create-meal", (0, auth_1.default)(client_1.UserRole.PROVIDER), meal_controller_1.MealController.createMeal);
router.get("/", meal_controller_1.MealController.getAllMeal);
router.patch("/:id", (0, auth_1.default)(client_1.UserRole.PROVIDER), meal_controller_1.MealController.updateMeal);
router.delete("/:id", (0, auth_1.default)(), meal_controller_1.MealController.deleteMeal);
exports.MealRoutes = router;
