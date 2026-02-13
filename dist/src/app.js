"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const node_1 = require("better-auth/node");
const meal_route_1 = require("./modules/meal/meal.route");
const provider_route_1 = require("./modules/provider/provider.route");
const category_route_1 = require("./modules/category/category.route");
const order_route_1 = require("./modules/order/order.route");
const address_route_1 = require("./modules/address/address.route");
const orderItem_route_1 = require("./modules/orderItem/orderItem.route");
const review_route_1 = require("./modules/review/review.route");
const auth_1 = require("./lib/auth");
const globalErrorHandler_1 = __importDefault(require("./middlewares/globalErrorHandler"));
const notFound_1 = __importDefault(require("./middlewares/notFound"));
const auth_route_1 = require("./modules/auth/auth.route");
const app = (0, express_1.default)();
const allowedOrigins = ["http://localhost:3000", /\.vercel\.app$/];
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        if (!origin ||
            allowedOrigins.some((allowed) => typeof allowed === "string"
                ? allowed === origin
                : allowed.test(origin))) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
}));
app.all("/api/auth/*splat", (0, node_1.toNodeHandler)(auth_1.auth));
app.get("/", (req, res) => {
    res.send("Food Hub Backend is running...");
});
app.use("/api/v1/auth", auth_route_1.AuthRoute);
app.use("/api/v1/meals", meal_route_1.MealRoutes);
app.use("/api/v1/providers", provider_route_1.ProviderRoutes);
app.use("/api/v1/categories", category_route_1.CategoryRoutes);
app.use("/api/v1/orders", order_route_1.OrderRoutes);
app.use("/api/v1/addresses", address_route_1.AddressRoutes);
app.use("/api/v1/order-items", orderItem_route_1.OrderItemRoutes);
app.use("/api/v1/reviews", review_route_1.ReviewRoutes);
app.use(globalErrorHandler_1.default);
app.use(notFound_1.default);
exports.default = app;
