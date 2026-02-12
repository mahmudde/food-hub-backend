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
const getProviderProfile = async (req: Request, res: Response) => {
  const userId = (req.user as any)?.id || (req.user as any)?.userId;

  const result = await ProviderService.getProviderProfile(userId);

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
export const ProviderController = {
  createProviderProfile,
  getProviderProfile,
};
