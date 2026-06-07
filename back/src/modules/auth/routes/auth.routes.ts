import { Router } from "express";

import { AuthController } from "../controllers/auth.controller";

import { validate } from "../../../shared/middleware/validate";

import { registerSchema } from "../validations/register.validation";

import { loginSchema } from "../validations/login.validation";

import { asyncHandler } from "../../../shared/utils/asyncHandler";

const router = Router();

const authController =
  new AuthController();

router.post(
  "/register",
  validate(registerSchema),
  asyncHandler(
    authController.register
  )
);

router.post(
  "/login",
  validate(loginSchema),
  asyncHandler(
    authController.login
  )
);

export default router;