import { Request, Response, NextFunction } from "express";
import { UserRole } from "@prisma/client";
import { prisma } from "../lib/prisma";

const auth = (...roles: UserRole[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
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
        )
        ?.split("=")[1];

      const token = decodeURIComponent(rawToken || "");

      const sessionWithUser = await prisma.session.findUnique({
        where: { token: token },
        include: { user: true },
      });

      if (!sessionWithUser) {
        return res
          .status(401)
          .json({ success: false, message: "Unauthorized" });
      }

      if (
        roles.length &&
        !roles.includes(sessionWithUser.user.role as UserRole)
      ) {
        return res.status(403).json({ success: false, message: "Forbidden" });
      }

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
