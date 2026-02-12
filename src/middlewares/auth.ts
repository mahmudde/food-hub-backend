import { Request, Response, NextFunction } from "express";
import { UserRole } from "@prisma/client";
import { prisma } from "../lib/prisma";

const authMiddleware = (...roles: UserRole[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cookieHeader = req.headers.cookie || "";

      const rawToken = cookieHeader
        .split("; ")
        .find((row) => row.startsWith("better-auth.session_token="))
        ?.split("=")[1];

      if (!rawToken) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized: No session token found",
        });
      }

      const decodedToken = decodeURIComponent(rawToken);
      const cleanToken = decodedToken.includes(".")
        ? decodedToken.split(".")[0]
        : decodedToken;

      const sessionData = await prisma.session.findFirst({
        where: {
          token: cleanToken as string,
        },
        include: {
          user: true,
        },
      });

      if (!sessionData || !sessionData.user) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized: Invalid session",
        });
      }

      if (new Date() > sessionData.expiresAt) {
        return res.status(401).json({
          success: false,
          message: "Session expired",
        });
      }

      const user = sessionData.user;
      if (roles.length && !roles.includes(user.role as UserRole)) {
        return res.status(403).json({
          success: false,
          message: "Forbidden: Access denied",
        });
      }

      (req as any).user = user;

      next();
    } catch (err) {
      console.error("Auth Middleware Error:", err);
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  };
};

export default authMiddleware;
