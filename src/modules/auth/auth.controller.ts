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

export const AuthController = {
  signUp,
};
