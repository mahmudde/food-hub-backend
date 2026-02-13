"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProviderService = void 0;
const prisma_1 = require("../../lib/prisma");
const createProviderProfile = async (payload) => {
    const isExist = await prisma_1.prisma.providerProfile.findUnique({
        where: { user_id: payload.user_id },
    });
    if (isExist) {
        throw new Error("Already you have a profile");
    }
    const result = await prisma_1.prisma.providerProfile.create({
        data: payload,
    });
    return result;
};
const getProviderProfile = async (userId) => {
    const result = await prisma_1.prisma.providerProfile.findUnique({
        where: {
            user_id: userId,
        },
        include: {
            user: true,
        },
    });
    return result;
};
exports.ProviderService = {
    createProviderProfile,
    getProviderProfile,
};
