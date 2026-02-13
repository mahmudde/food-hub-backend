"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const client_1 = require("@prisma/client");
const auth_1 = require("../../lib/auth");
const prisma_1 = require("../../lib/prisma");
const signUpUser = async (userData) => {
    const result = await auth_1.auth.api.signUpEmail({
        body: {
            name: userData.name,
            email: userData.email,
            password: userData.password,
            // @ts-ignore
            role: userData.role || "CUSTOMER",
        },
    });
    return result;
};
const loginUser = async (payload) => {
    const { email, password } = payload;
    const result = await auth_1.auth.api.signInEmail({
        body: {
            email,
            password,
        },
    });
    return result;
};
const getMe = async (reqHeaders) => {
    const lastSession = await prisma_1.prisma.session.findFirst({
        orderBy: { createdAt: "desc" },
        include: { user: true },
    });
    if (!lastSession) {
        throw new Error("No session found please login again");
    }
    return lastSession.user;
};
const updateFullProfile = async (userId, data) => {
    return await prisma_1.prisma.$transaction(async (tx) => {
        if (!userId) {
            throw new Error("User ID is required for profile update");
        }
        const updatedUser = await tx.user.update({
            where: { id: userId },
            data: {
                name: data.name,
                image: data.image,
            },
        });
        let addressRecord = null;
        if (data.address) {
            addressRecord = await tx.address.upsert({
                where: { id: data.address.id || "new-id" },
                update: {
                    address_line: data.address.address_line,
                    city: data.address.city,
                    phone: data.address.phone,
                },
                create: {
                    address_line: data.address.address_line,
                    city: data.address.city,
                    phone: data.address.phone,
                    user_id: userId,
                },
            });
        }
        if (data.restaurant) {
            await tx.user.update({
                where: { id: userId },
                data: { role: client_1.UserRole.PROVIDER },
            });
            await tx.providerProfile.upsert({
                where: { user_id: userId },
                update: {
                    resturant_name: data.restaurant.resturant_name,
                    description: data.restaurant.description,
                    address_id: addressRecord?.id || null,
                },
                create: {
                    resturant_name: data.restaurant.resturant_name,
                    description: data.restaurant.description,
                    user_id: userId,
                    address_id: addressRecord?.id || null,
                },
            });
        }
        return updatedUser;
    });
};
const becomeProvider = async (userId) => {
    const updatedUser = await prisma_1.prisma.user.update({
        where: { id: userId },
        data: {
            role: "PROVIDER",
        },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
        },
    });
    return updatedUser;
};
const getAllUsers = async () => {
    return await prisma_1.prisma.user.findMany({
        orderBy: {
            createdAt: "desc",
        },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            image: true,
            createdAt: true,
        },
    });
};
const changeUserRole = async (userId, newRole) => {
    return await prisma_1.prisma.user.update({
        where: { id: userId },
        data: { role: newRole },
    });
};
const deleteUser = async (userId) => {
    return await prisma_1.prisma.user.delete({
        where: { id: userId },
    });
};
exports.AuthService = {
    signUpUser,
    loginUser,
    getMe,
    updateFullProfile,
    becomeProvider,
    getAllUsers,
    changeUserRole,
    deleteUser,
};
