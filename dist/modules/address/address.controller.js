import { AddressService } from "./address.service";
const createAddress = async (req, res) => {
    try {
        const user = req.user;
        const result = await AddressService.createAddress(user.id, req.body);
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
        const result = await AddressService.getMyAddresses(user.id);
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
        const result = await AddressService.updateAddress(id, user.id, req.body);
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
        await AddressService.deleteAddress(id, user.id);
        res.status(200).json({
            success: true,
            message: "Adress deleted successfully",
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
export const AddressController = {
    createAddress,
    getMyAddresses,
    updateAddress,
    deleteAddress,
};
