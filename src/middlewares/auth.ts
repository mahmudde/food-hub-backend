import { Request, Response, NextFunction } from "express";
import { UserRole } from "@prisma/client";
import { prisma } from "../lib/prisma"; // আপনার প্রিজমা পাথ অনুযায়ী ঠিক করুন

const auth = (...roles: UserRole[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // ১. কুকি রিড করার সঠিক পদ্ধতি (Express way)
      const rawCookie = req.headers.cookie;

      if (!rawCookie) {
        return res
          .status(401)
          .json({ success: false, message: "No cookies found" });
      }

      const rawToken = rawCookie
        .split("; ")
        .find((row: string) =>
          row.trim().startsWith("better-auth.session_token="),
        ) // row: string দিয়ে টাইপ দিন
        ?.split("=")[1];

      const token = decodeURIComponent(rawToken || "");

      // ২. ডাটাবেস চেক
      const sessionWithUser = await prisma.session.findUnique({
        where: { token: token },
        include: { user: true },
      });

      if (!sessionWithUser) {
        return res
          .status(401)
          .json({ success: false, message: "Unauthorized" });
      }

      // ৩. রোল ভ্যালিডেশন
      if (
        roles.length &&
        !roles.includes(sessionWithUser.user.role as UserRole)
      ) {
        return res.status(403).json({ success: false, message: "Forbidden" });
      }

      // ৪. ইউজার সেট করা (এরর হ্যান্ডেল করতে টাইপ কাস্টিং)
      (req as any).user = {
        id: sessionWithUser.user.id,
        email: sessionWithUser.user.email,
        role: sessionWithUser.user.role as UserRole,
      };

      next();
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  };
};

export default auth;
