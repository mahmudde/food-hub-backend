import { prisma } from "../../lib/prisma";
const createAddress = async (userId, payload) => {
    return await prisma.address.create({
        data: {
            ...payload,
            user_id: userId,
        },
    });
};
const getMyAddresses = async (userId) => {
    return await prisma.address.findMany({
        where: { user_id: userId },
    });
};
const updateAddress = async (addressId, userId, payload) => {
    return await prisma.address.update({
        where: {
            id: addressId,
            user_id: userId,
        },
        data: payload,
    });
};
const deleteAddress = async (addressId, userId) => {
    return await prisma.address.delete({
        where: {
            id: addressId,
            user_id: userId,
        },
    });
};
export const AddressService = {
    createAddress,
    getMyAddresses,
    updateAddress,
    deleteAddress,
};
