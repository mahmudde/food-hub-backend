import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { auth } from "../../lib/auth";

const signUp = async (req: Request, res: Response) => {
  try {
    const result = await AuthService.signUpUser(req.body);

    res.status(201).json({
      success: true,
      message: "Account created successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const result = await AuthService.loginUser(req.body);

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

const getMe = async (req: Request, res: Response) => {
  try {
    const result = await AuthService.getMe(req.headers);
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

const handleProfileUpdate = async (req: Request, res: Response) => {
  console.log("Full User Object:", (req as any).user);

  try {
    const userId = (req as any).user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized! Please login again.",
      });
    }

    const updateData = req.body;
    const result = await AuthService.updateFullProfile(userId, updateData);

    res.status(200).json({
      success: true,
      message: "Profile and Provider settings updated successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

const becomeProvider = async (req: Request, res: Response) => {
  try {
    const session = await auth.api.getSession({
      headers: new Headers(req.headers as any),
    });

    if (!session || !session.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Please login first",
      });
    }

    const result = await AuthService.becomeProvider(session.user.id);

    res.status(200).json({
      success: true,
      message: "Congratulations! You are now a PROVIDER.",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to update role",
    });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await AuthService.getAllUsers();

    return res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: users,
    });
  } catch (error: any) {
    console.error("Get All Users Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
const changeRole = async (req: Request, res: Response) => {
  try {
    const { userId, role } = req.body;

    if (!userId || !role) {
      return res
        .status(400)
        .json({ success: false, message: "User ID and Role are required" });
    }

    const result = await AuthService.changeUserRole(userId, role);

    res.status(200).json({
      success: true,
      message: "User role updated successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to update role",
    });
  }
};

const removeUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "User ID is required" });
    }

    await AuthService.deleteUser(id as string);

    res.status(200).json({
      success: true,
      message: "User deleted successfully from database",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to delete user",
    });
  }
};

export const AuthController = {
  signUp,
  login,
  getMe,
  handleProfileUpdate,
  becomeProvider,
  getAllUsers,
  changeRole,
  removeUser,
};
