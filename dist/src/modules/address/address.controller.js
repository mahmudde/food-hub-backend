"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressController = void 0;
const address_service_1 = require("./address.service");
const createAddress = async (req, res) => {
    try {
        const user = req.user;
        const result = await address_service_1.AddressService.createAddress(user.id, req.body);
        res.status(201).json({
            success: true,
            message: "Address saved successfully!",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
const getMyAddresses = async (req, res) => {
    try {
        const user = req.user;
        const result = await address_service_1.AddressService.getMyAddresses(user.id);
        res.status(200).json({
            success: true,
            message: "All adress retrived successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
const updateAddress = async (req, res) => {
    try {
        const { id } = req.params;
        const user = req.user;
        const result = await address_service_1.AddressService.updateAddress(id, user.id, req.body);
        res.status(200).json({
            success: true,
            message: "Adress updated successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
const deleteAddress = async (req, res) => {
    try {
        const { id } = req.params;
        const user = req.user;
        await address_service_1.AddressService.deleteAddress(id, user.id);
        res.status(200).json({
            success: true,
            message: "Adress deleted successfully",
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.AddressController = {
    createAddress,
    getMyAddresses,
    updateAddress,
    deleteAddress,
};
