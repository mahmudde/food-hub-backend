"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressService = void 0;
const prisma_1 = require("../../lib/prisma");
const createAddress = async (userId, payload) => {
    return await prisma_1.prisma.address.create({
        data: {
            ...payload,
            user_id: userId,
        },
    });
};
const getMyAddresses = async (userId) => {
    return await prisma_1.prisma.address.findMany({
        where: { user_id: userId },
    });
};
const updateAddress = async (addressId, userId, payload) => {
    return await prisma_1.prisma.address.update({
        where: {
            id: addressId,
            user_id: userId,
        },
        data: payload,
    });
};
const deleteAddress = async (addressId, userId) => {
    return await prisma_1.prisma.address.delete({
        where: {
            id: addressId,
            user_id: userId,
        },
    });
};
exports.AddressService = {
    createAddress,
    getMyAddresses,
    updateAddress,
    deleteAddress,
};
