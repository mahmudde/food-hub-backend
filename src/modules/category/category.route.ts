import express from "express";
import { CategoryController } from "./category.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.post(
  "/create-category",
  auth(UserRole.PROVIDER),
  CategoryController.createCategory,
);
router.get("/", CategoryController.getAllCategories);

export const CategoryRoutes = router;
