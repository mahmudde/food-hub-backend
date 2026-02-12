import { prisma } from "../../lib/prisma";

const createProviderProfile = async (payload: any) => {
  const isExist = await prisma.providerProfile.findUnique({
    where: { user_id: payload.user_id },
  });

  if (isExist) {
    throw new Error("Already you have a profile");
  }
  const result = await prisma.providerProfile.create({
    data: payload,
  });
  return result;
};

const getProviderProfile = async (userId: string) => {
  const result = await prisma.providerProfile.findUnique({
    where: {
      user_id: userId,
    },
    include: {
      user: true,
    },
  });
  return result;
};

export const ProviderService = {
  createProviderProfile,
  getProviderProfile,
};
