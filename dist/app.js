import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { toNodeHandler } from "better-auth/node";
import { MealRoutes } from "./modules/meal/meal.route";
import { ProviderRoutes } from "./modules/provider/provider.route";
import { CategoryRoutes } from "./modules/category/category.route";
import { OrderRoutes } from "./modules/order/order.route";
import { AddressRoutes } from "./modules/address/address.route";
import { OrderItemRoutes } from "./modules/orderItem/orderItem.route";
import { ReviewRoutes } from "./modules/review/review.route";
import { auth } from "./lib/auth";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import notFound from "./middlewares/notFound";
import { AuthRoute } from "./modules/auth/auth.route";
const app = express();
const allowedOrigins = ["http://localhost:3000", /\.vercel\.app$/];
app.use(cookieParser());
app.use(express.json());
app.use(cors({
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
app.all("/api/auth/*splat", toNodeHandler(auth));
app.get("/", (req, res) => {
    res.send("Food Hub Backend is running...");
});
app.use("/api/v1/auth", AuthRoute);
app.use("/api/v1/meals", MealRoutes);
app.use("/api/v1/providers", ProviderRoutes);
app.use("/api/v1/categories", CategoryRoutes);
app.use("/api/v1/orders", OrderRoutes);
app.use("/api/v1/addresses", AddressRoutes);
app.use("/api/v1/order-items", OrderItemRoutes);
app.use("/api/v1/reviews", ReviewRoutes);
app.use(globalErrorHandler);
app.use(notFound);
export default app;
