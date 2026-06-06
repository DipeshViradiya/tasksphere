import { Request, Response, NextFunction } from "express";

import { AppError } from "../errors/appError";

import { logger } from "../logger/logger";

export const errorHandler = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    logger.error(error.message, {
        stack: error.stack,
        path: req.originalUrl,
        method: req.method,
    });

    if (error instanceof AppError) {
        return res.status(error.statusCode).json({
            success: false,
            message: error.message,
        });
    }

    return res.status(500).json({
        success: false,
        message: "Internal Server Error",
    });
};