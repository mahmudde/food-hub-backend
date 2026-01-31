import { auth } from "../../lib/auth";

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

export const AuthService = {
  signUpUser,
};
