import { Request, Response } from "express";
import { ProviderService } from "./provider.service";

const createProviderProfile = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    const profileData = {
      ...req.body,
      user_id: user?.id,
    };
    const result = await ProviderService.createProviderProfile(profileData);
    res.status(201).json({
      successs: true,
      message: "Provider profile created successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const ProviderController = {
  createProviderProfile,
};
