import { UserRole } from "@prisma/client";
import { auth } from "../../lib/auth";
import { prisma } from "../../lib/prisma";

const signUpUser = async (userData: any) => {
  const result = await auth.api.signUpEmail({
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

const loginUser = async (payload: any) => {
  const { email, password } = payload;
  const result = await auth.api.signInEmail({
    body: {
      email,
      password,
    },
  });
  return result;
};

const getMe = async (reqHeaders: any) => {
  const lastSession = await prisma.session.findFirst({
    orderBy: { createdAt: "desc" },
    include: { user: true },
  });

  if (!lastSession) {
    throw new Error("No session found please login again");
  }
  return lastSession.user;
};

const updateFullProfile = async (userId: string, data: any) => {
  return await prisma.$transaction(async (tx) => {
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
        data: { role: UserRole.PROVIDER },
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

const becomeProvider = async (userId: string) => {
  const updatedUser = await prisma.user.update({
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
  return await prisma.user.findMany({
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

const changeUserRole = async (userId: string, newRole: UserRole) => {
  return await prisma.user.update({
    where: { id: userId },
    data: { role: newRole },
  });
};

const deleteUser = async (userId: string) => {
  return await prisma.user.delete({
    where: { id: userId },
  });
};

export const AuthService = {
  signUpUser,
  loginUser,
  getMe,
  updateFullProfile,
  becomeProvider,
  getAllUsers,
  changeUserRole,
  deleteUser,
};
