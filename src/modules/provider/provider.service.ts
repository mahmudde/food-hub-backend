import { prisma } from "../../lib/prisma";

const createProviderProfile = async (payload: any) => {
  const result = await prisma.providerProfile.create({
    data: payload,
  });
  return result;
};

const getMyProfile = async (userId: string) => {
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
  getMyProfile,
};
