import express, { Application } from "express";
import { UserRoutes } from "./modules/auth/auth.route";
import cors from "cors";
import cookieParser from "cookie-parser";
import { MealRoutes } from "./modules/meal/meal.route";
import { ProviderRoutes } from "./modules/provider/provider.route";
import { auth } from "./lib/auth";
import { toNodeHandler } from "better-auth/node";
import { CategoryRoutes } from "./modules/category/category.route";
import { OrderRoutes } from "./modules/order/order.route";
import { AddressRoutes } from "./modules/address/address.route";
import { OrderItemRoutes } from "./modules/orderItem/orderItem.route";

const app: Application = express();

app.use(cookieParser());
app.use(express.json());
app.all("/api/auth/*splat", toNodeHandler(auth));
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173"],
    credentials: true,
  }),
);

app.get("/", (req, res) => {
  res.send("Hello, World....");
});
app.use("/api/v1/auth", UserRoutes);
app.use("/api/v1/meals", MealRoutes);
app.use("/api/v1/providers", ProviderRoutes);
app.use("/api/v1/categories", CategoryRoutes);
app.use("/api/v1/orders", OrderRoutes);
app.use("/api/v1/addresses", AddressRoutes);
app.use("/api/v1/order_items", OrderItemRoutes);

export default app;
