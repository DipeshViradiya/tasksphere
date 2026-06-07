import { Request } from "express";

import { UserRole } from "../constants/roles";

export interface AuthenticatedRequest
  extends Request {
  user?: {
    userId: string;
    role: UserRole;
  };
}
