import { Response, NextFunction } from "express";

import { AuthenticatedRequest } from "../types/express";

import { AppError } from "../errors/appError";

import { verifyAccessToken } from "../../modules/auth/utils/jwt";

export const protect = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError("Authentication required", 401);
  }

  const [scheme, token] = authHeader.split(" ");

  if (scheme !== "Bearer" || !token) {
    throw new AppError("Invalid authorization header", 401);
  }

  try {
    const payload = verifyAccessToken(token);

    req.user = {
      userId: payload.userId,
      role: payload.role,
    };

    next();
  } catch (error) {
    throw new AppError("Invalid or expired token", 401);
  }
};