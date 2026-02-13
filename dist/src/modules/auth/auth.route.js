"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoute = void 0;
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const auth_2 = require("../../lib/auth");
const client_1 = require("@prisma/client");
const router = (0, express_1.Router)();
router.get("/all-users", (0, auth_1.default)(client_1.UserRole.ADMIN), auth_controller_1.AuthController.getAllUsers);
router.patch("/change-role", (0, auth_1.default)(client_1.UserRole.ADMIN), auth_controller_1.AuthController.changeRole);
router.delete("/delete-user/:id", (0, auth_1.default)(client_1.UserRole.ADMIN), auth_controller_1.AuthController.removeUser);
router.post("/signup", auth_controller_1.AuthController.signUp);
router.post("/login", auth_controller_1.AuthController.login);
router.get("/me", (0, auth_1.default)(), auth_controller_1.AuthController.getMe);
router.patch("/update-all", (0, auth_1.default)(), auth_controller_1.AuthController.handleProfileUpdate);
router.patch("/become-provider", (0, auth_1.default)(), auth_controller_1.AuthController.becomeProvider);
router.use("/", async (req, res) => {
    try {
        const protocol = req.protocol;
        const host = req.headers.host;
        const fullUrl = `${protocol}://${host}${req.originalUrl}`;
        const webReq = new Request(fullUrl, {
            method: req.method,
            headers: new Headers(req.headers),
            body: req.method !== "GET" && req.method !== "HEAD"
                ? JSON.stringify(req.body)
                : null,
        });
        const webRes = await auth_2.auth.handler(webReq);
        res.status(webRes.status);
        webRes.headers.forEach((value, key) => {
            res.setHeader(key, value);
        });
        const data = await webRes.text();
        return res.send(data);
    }
    catch (err) {
        console.error("Better Auth Error:", err);
        return res
            .status(500)
            .json({ success: false, message: "Auth Handler Error" });
    }
});
exports.AuthRoute = router;
