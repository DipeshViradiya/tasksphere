import { Request, Response } from "express";

import { AuthService } from "../services/auth.service";
import { AuthenticatedRequest } from "../../../shared/types/express";

export class AuthController {
  constructor(
    private readonly authService = new AuthService()
  ) {}

  register = async (req: Request, res: Response) => {
    const result = await this.authService.register(req.body);

    res.status(201).json({
      success: true,
      data: result,
    });
  };

  login = async (req: Request, res: Response) => {
    const result = await this.authService.login(req.body);

    res.status(200).json({
      success: true,
      data: result,
    });
  };

  me = async (req: AuthenticatedRequest, res: Response) => {
    const result = await this.authService.getCurrentUser(req.user!.userId);

    res.status(200).json({
      success: true,
      data: result,
    });
  };

  refresh = async (req: Request, res: Response) => {
    const result = await this.authService.refresh(
      req.body.refreshToken
    );

    res.status(200).json({
      success: true,
      data: result,
    });
  };

  logout = async (req: AuthenticatedRequest, res: Response) => {
    await this.authService.logout(req.user!.userId);

    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  };

  adminOnly = async (req: AuthenticatedRequest, res: Response) => {
    res.status(200).json({
      success: true,
      message: "Access granted",
    });
  };
}
