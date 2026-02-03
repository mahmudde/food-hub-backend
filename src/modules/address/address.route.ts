import express from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { AddressController } from "./address.controller";
const router = express.Router();

router.post("/", auth(UserRole.CUSTOMER), AddressController.createAddress);
router.get("/", auth(UserRole.CUSTOMER), AddressController.getMyAddresses);
