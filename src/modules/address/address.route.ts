import express from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { AddressController } from "./address.controller";
const router = express.Router();

router.post("/", auth(UserRole.CUSTOMER), AddressController.createAddress);
router.get("/", auth(UserRole.CUSTOMER), AddressController.getMyAddresses);

router.patch("/:id", auth(UserRole.CUSTOMER), AddressController.updateAddress);

router.delete("/:id", auth(UserRole.CUSTOMER), AddressController.deleteAddress);

export const AddressRoutes = router;
