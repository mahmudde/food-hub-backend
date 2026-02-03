import { Request, Response } from "express";
import { AddressService } from "./address.service";

const createAddress = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const result = await AddressService.createAddress(user.id, req.body);

    res.status(201).json({
      success: true,
      message: "Address saved successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getMyAddresses = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const result = await AddressService.getMyAddresses(user.id);

    res.status(200).json({
      success: true,
      message: "All adress retrived successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const AddressController = {
  createAddress,
  getMyAddresses,
};
