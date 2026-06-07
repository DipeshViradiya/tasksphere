import jwt, { Secret, SignOptions } from "jsonwebtoken";

import { env } from "../../../config/env";
import { UserRole } from "../../../shared/constants/roles";
import { AppError } from "../../../shared/errors/appError";

export interface JwtPayload {
  userId: string;
  role: UserRole;
  iat?: number;
  exp?: number;
}

const isJwtPayload = (
  payload: unknown
): payload is JwtPayload => {
  return (
    typeof payload === "object" &&
    payload !== null &&
    typeof (payload as { userId?: unknown }).userId === "string" &&
    typeof (payload as { role?: unknown }).role === "string" &&
    Object.values(UserRole).includes(
      (payload as { role: UserRole }).role
    )
  );
};

const signOptions = (expiresIn: string): SignOptions => {
  return {
    expiresIn: expiresIn as unknown as string | number,
  } as SignOptions;
};

export const generateAccessToken = (
  payload: JwtPayload
): string => {
  const secret: Secret = env.JWT_ACCESS_SECRET;

  return jwt.sign(
    payload,
    secret,
    signOptions(env.ACCESS_TOKEN_EXPIRES_IN)
  );
};

export const generateRefreshToken = (
  payload: JwtPayload
): string => {
  const secret: Secret = env.JWT_REFRESH_SECRET;

  return jwt.sign(
    payload,
    secret,
    signOptions(env.REFRESH_TOKEN_EXPIRES_IN)
  );
};

const verifyToken = (
  token: string,
  secret: string
): JwtPayload => {
  const decoded = jwt.verify(token, secret as Secret);

  if (!isJwtPayload(decoded)) {
    throw new AppError("Invalid token payload", 401);
  }

  return decoded;
};

export const verifyAccessToken = (
  token: string
): JwtPayload => verifyToken(token, env.JWT_ACCESS_SECRET);

export const verifyRefreshToken = (
  token: string
): JwtPayload => verifyToken(token, env.JWT_REFRESH_SECRET);
