import { prisma } from "../../lib/prisma";

const createAddress = async (userId: string, payload: any) => {
  return await prisma.address.create({
    data: {
      ...payload,
      user_id: userId,
    },
  });
};

const getMyAddresses = async (userId: string) => {
  return await prisma.address.findMany({
    where: { user_id: userId },
  });
};

export const AddressService = { createAddress, getMyAddresses };
