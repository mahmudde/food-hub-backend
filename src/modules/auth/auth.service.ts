import { auth } from "../../lib/auth";
import { prisma } from "../../lib/prisma";

const signUpUser = async (userData: any) => {
  const result = await auth.api.signUpEmail({
    body: {
      email: userData.email,
      password: userData.password,
      name: userData.name,
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

export const AuthService = {
  signUpUser,
  loginUser,
  getMe,
};
