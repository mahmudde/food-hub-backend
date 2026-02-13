"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../lib/prisma");
const authMiddleware = (...roles) => {
    return async (req, res, next) => {
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
            const sessionData = await prisma_1.prisma.session.findFirst({
                where: {
                    token: cleanToken,
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
            if (roles.length && !roles.includes(user.role)) {
                return res.status(403).json({
                    success: false,
                    message: "Forbidden: Access denied",
                });
            }
            req.user = user;
            next();
        }
        catch (err) {
            console.error("Auth Middleware Error:", err);
            res.status(500).json({
                success: false,
                message: "Internal Server Error",
            });
        }
    };
};
exports.default = authMiddleware;
