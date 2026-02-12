import { Router } from "express";
import { AuthController } from "./auth.controller";
import authMiddleware from "../../middlewares/auth";
import { auth } from "../../lib/auth";
import { UserRole } from "@prisma/client";

const router = Router();

router.get(
  "/all-users",
  authMiddleware(UserRole.ADMIN),
  AuthController.getAllUsers,
);

router.patch(
  "/change-role",
  authMiddleware(UserRole.ADMIN),
  AuthController.changeRole,
);

router.delete(
  "/delete-user/:id",
  authMiddleware(UserRole.ADMIN),
  AuthController.removeUser,
);

router.post("/signup", AuthController.signUp);
router.post("/login", AuthController.login);
router.get("/me", authMiddleware(), AuthController.getMe);
router.patch(
  "/update-all",
  authMiddleware(),
  AuthController.handleProfileUpdate,
);
router.patch(
  "/become-provider",
  authMiddleware(),
  AuthController.becomeProvider,
);

router.use("/", async (req, res) => {
  try {
    const protocol = req.protocol;
    const host = req.headers.host;
    const fullUrl = `${protocol}://${host}${req.originalUrl}`;

    const webReq = new Request(fullUrl, {
      method: req.method,
      headers: new Headers(req.headers as any),
      body:
        req.method !== "GET" && req.method !== "HEAD"
          ? JSON.stringify(req.body)
          : null,
    });

    const webRes = await auth.handler(webReq);

    res.status(webRes.status);
    webRes.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });

    const data = await webRes.text();
    return res.send(data);
  } catch (err) {
    console.error("Better Auth Error:", err);
    return res
      .status(500)
      .json({ success: false, message: "Auth Handler Error" });
  }
});

export const AuthRoute = router;
