import { betterAuth } from "better-auth";
import { prisma } from "./prisma";
import { prismaAdapter } from "better-auth/adapters/prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  baseURL: "http://localhost:5000",
  basePath: "/api/v1/auth",

  // 1. লোকালহোস্টে কুকি কাজ করার জন্য এটি অত্যন্ত জরুরি
  advanced: {
    useSecureCookies: false,
  },

  // 2. সেশন স্ট্র্যাটেজি ডাটাবেস নিশ্চিত করুন
  session: {
    expiresIn: 60 * 60 * 24 * 7,
    strategy: "database",
  },

  trustedOrigins: ["http://localhost:5000"],

  emailAndPassword: {
    enabled: true,
  },

  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "CUSTOMER",
      },
      status: {
        type: "string",
        defaultValue: "ACTIVE",
      },
    },
  },
});
