import { betterAuth } from "better-auth";
import { prisma } from "./prisma";
import { prismaAdapter } from "better-auth/adapters/prisma";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.APP_USER,
    pass: process.env.APP_PASS,
  },
});

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  baseURL: process.env.APP_URL || "http://localhost:3000",
  basePath: "/api/v1/auth",
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      redirectURI: "http://localhost:5000/api/v1/auth/callback/google",
    },
  },
  advanced: {
    useSecureCookies: false,
    crossOrigin: true,
  },

  session: {
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
    strategy: "database",
  },

  trustedOrigins: [process.env.APP_URL!],

  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "CUSTOMER",
        input: false,
      },
      status: {
        type: "string",
        defaultValue: "ACTIVE",
      },
    },
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    requireEmailVerification: true,
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url, token }, request) => {
      try {
        const verificationUrl = `${process.env.APP_URL}/verify-email?token=${token}`;

        const info = await transporter.sendMail({
          from: '"Food Hub" <support@foodhub.com>',
          to: user.email,
          subject: "Confirm your email - Food Hub 🍲",
          html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Food Hub Verification</title>
  <style>
    body { margin: 0; padding: 0; background-color: #f9fafb; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
    .container { max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08); }
    .header { background-color: #ea580c; color: #ffffff; padding: 30px; text-align: center; }
    .header h1 { margin: 0; font-size: 28px; font-weight: 800; letter-spacing: 1px; }
    .content { padding: 40px; color: #374151; line-height: 1.7; }
    .content h2 { margin-top: 0; font-size: 22px; color: #111827; }
    .button-wrapper { text-align: center; margin: 35px 0; }
    .verify-button { background-color: #ea580c; color: #ffffff !important; padding: 16px 32px; text-decoration: none; font-weight: bold; border-radius: 50px; display: inline-block; transition: background 0.3s; }
    .verify-button:hover { background-color: #c2410c; }
    .footer { background-color: #f3f4f6; padding: 25px; text-align: center; font-size: 13px; color: #6b7280; }
    .link { word-break: break-all; font-size: 12px; color: #ea580c; margin-top: 10px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🍲 Food Hub</h1>
    </div>
    <div class="content">
      <h2>Welcome to the family, ${user.name}!</h2>
      <p>
        আপনার প্রিয় খাবারগুলো এখন মাত্র এক ক্লিক দূরে। <strong>Food Hub</strong>-এ রেজিস্ট্রেশন করার জন্য ধন্যবাদ। 
        আপনার অ্যাকাউন্টটি অ্যাক্টিভেট করতে নিচের বাটনে ক্লিক করে ইমেইলটি ভেরিফাই করুন।
      </p>

      <div class="button-wrapper">
        <a href="${verificationUrl}" class="verify-button">Verify My Email</a>
      </div>

      <p>যদি উপরের বাটনটি কাজ না করে, তবে নিচের লিঙ্কটি কপি করে আপনার ব্রাউজারে পেস্ট করুন:</p>
      <p class="link">${url}</p>

      <p>নিরাপত্তার খাতিরে এই লিঙ্কটি কিছুক্ষণ পর এক্সপায়ার হয়ে যাবে। যদি আপনি অ্যাকাউন্ট খুলে না থাকেন, তবে এই ইমেইলটি ইগনোর করুন।</p>
      
      <p>ধন্যবাদান্তে,<br /><strong>Food Hub Team</strong></p>
    </div>
    <div class="footer">
      © 2026 Food Hub. ডেলিভারি হচ্ছে ভালোবাসা প্রতিটি ঘরে।
    </div>
  </div>
</body>
</html>`,
        });

        console.log("Verification email sent: %s", info.messageId);
      } catch (err) {
        console.error("Email verification error:", err);
        throw err;
      }
    },
  },
});
