import { Request, Response } from "express";
import { AuthService } from "./auth.service";

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

// const getMe = async (req: Request, res: Response) => {
//   try {
//     const result = await AuthService.getMe(req.headers);

//     res.status(200).json({
//       success: true,
//       message: "Profile data retrieved successfully",
//       data: result,
//     });
//   } catch (error: any) {
//     res.status(401).json({
//       success: false,
//       message: error.message || "Unauthorized",
//     });
//   }
// };

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

export const AuthController = {
  signUp,
  login,
  getMe,
};
