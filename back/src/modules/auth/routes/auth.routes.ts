import { Router } from "express";

import { AuthController } from "../controllers/auth.controller";

import { validate } from "../../../shared/middleware/validate";

import { registerSchema } from "../validations/register.validation";
import { loginSchema } from "../validations/login.validation";
import { refreshSchema } from "../validations/refresh.validation";

import { asyncHandler } from "../../../shared/utils/asyncHandler";
import { protect } from "../../../shared/middleware/auth.middleware";
import { authorize } from "../../../shared/middleware/rbac.middleware";
import { UserRole } from "../../../shared/constants/roles";

const router = Router();

const authController = new AuthController();

router.post(
  "/register",
  validate(registerSchema),
  asyncHandler(authController.register)
);

router.post(
  "/login",
  validate(loginSchema),
  asyncHandler(authController.login)
);

router.get(
  "/me",
  protect,
  asyncHandler(authController.me)
);

router.get(
  "/admin-only",
  protect,
  authorize(UserRole.ADMIN),
  asyncHandler(authController.adminOnly)
);

router.post(
  "/refresh",
  validate(refreshSchema),
  asyncHandler(authController.refresh)
);

router.post(
  "/logout",
  protect,
  asyncHandler(authController.logout)
);

export default router;