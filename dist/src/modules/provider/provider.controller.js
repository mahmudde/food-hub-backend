"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProviderController = void 0;
const provider_service_1 = require("./provider.service");
const createProviderProfile = async (req, res) => {
    try {
        const user = req.user;
        const profileData = {
            ...req.body,
            user_id: user?.id,
        };
        const result = await provider_service_1.ProviderService.createProviderProfile(profileData);
        res.status(201).json({
            successs: true,
            message: "Provider profile created successfully",
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
const getProviderProfile = async (req, res) => {
    const userId = req.user?.id || req.user?.userId;
    const result = await provider_service_1.ProviderService.getProviderProfile(userId);
    if (!result) {
        return res.status(404).json({
            success: false,
            message: "Provider profile not found!",
            data: null,
        });
    }
    res.status(200).json({
        success: true,
        message: "Provider profile fetched successfully!",
        data: result,
    });
};
exports.ProviderController = {
    createProviderProfile,
    getProviderProfile,
};
