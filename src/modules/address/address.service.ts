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

const updateAddress = async (
  addressId: string,
  userId: string,
  payload: any,
) => {
  return await prisma.address.update({
    where: {
      id: addressId,
      user_id: userId,
    },
    data: payload,
  });
};

const deleteAddress = async (addressId: string, userId: string) => {
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
