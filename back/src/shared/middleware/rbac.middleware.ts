import { NextFunction, Response } from "express";

import { AuthenticatedRequest } from "../types/express";
import { AppError } from "../errors/appError";
import { UserRole } from "../constants/roles";

export const authorize = (
  ...allowedRoles: UserRole[]
) => {
  return (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    const user = req.user;

    if (!user) {
      throw new AppError("Authentication required", 401);
    }

    if (!allowedRoles.includes(user.role)) {
      throw new AppError("Forbidden", 403);
    }

    next();
  };
};
