"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_service_1 = require("./auth.service");
const auth_1 = require("../../lib/auth");
const signUp = async (req, res) => {
    try {
        const result = await auth_service_1.AuthService.signUpUser(req.body);
        res.status(201).json({
            success: true,
            message: "Account created successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};
const login = async (req, res) => {
    try {
        const result = await auth_service_1.AuthService.loginUser(req.body);
        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(401).json({
            success: false,
            message: error.message,
        });
    }
};
const getMe = async (req, res) => {
    try {
        const result = await auth_service_1.AuthService.getMe(req.headers);
        res.status(200).json({
            success: true,
            data: result,
        });
    }
    catch (error) {
        res.status(401).json({
            success: false,
            message: error.message,
        });
    }
};
const handleProfileUpdate = async (req, res) => {
    console.log("Full User Object:", req.user);
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized! Please login again.",
            });
        }
        const updateData = req.body;
        const result = await auth_service_1.AuthService.updateFullProfile(userId, updateData);
        res.status(200).json({
            success: true,
            message: "Profile and Provider settings updated successfully!",
            data: result,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message || "Something went wrong",
        });
    }
};
const becomeProvider = async (req, res) => {
    try {
        const session = await auth_1.auth.api.getSession({
            headers: new Headers(req.headers),
        });
        if (!session || !session.user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: Please login first",
            });
        }
        const result = await auth_service_1.AuthService.becomeProvider(session.user.id);
        res.status(200).json({
            success: true,
            message: "Congratulations! You are now a PROVIDER.",
            data: result,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message || "Failed to update role",
        });
    }
};
const getAllUsers = async (req, res) => {
    try {
        const users = await auth_service_1.AuthService.getAllUsers();
        return res.status(200).json({
            success: true,
            message: "Users fetched successfully",
            data: users,
        });
    }
    catch (error) {
        console.error("Get All Users Error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};
const changeRole = async (req, res) => {
    try {
        const { userId, role } = req.body;
        if (!userId || !role) {
            return res
                .status(400)
                .json({ success: false, message: "User ID and Role are required" });
        }
        const result = await auth_service_1.AuthService.changeUserRole(userId, role);
        res.status(200).json({
            success: true,
            message: "User role updated successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Failed to update role",
        });
    }
};
const removeUser = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res
                .status(400)
                .json({ success: false, message: "User ID is required" });
        }
        await auth_service_1.AuthService.deleteUser(id);
        res.status(200).json({
            success: true,
            message: "User deleted successfully from database",
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Failed to delete user",
        });
    }
};
exports.AuthController = {
    signUp,
    login,
    getMe,
    handleProfileUpdate,
    becomeProvider,
    getAllUsers,
    changeRole,
    removeUser,
};
