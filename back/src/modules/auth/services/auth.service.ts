import bcrypt from "bcrypt";

import { AppError } from "../../../shared/errors/appError";

import { RegisterDto } from "../dto/register.dto";

import { UserRepository } from "../repositories/user.repository";

import crypto from "crypto";

import { LoginDto } from "../dto/login.dto";

import {
    generateAccessToken,
    generateRefreshToken,
} from "../utils/jwt";

import { RefreshTokenRepository } from "../repositories/refresh-token.repository";
export class AuthService {
    constructor(
        private readonly userRepository =
            new UserRepository(),
        private readonly refreshTokenRepository =
            new RefreshTokenRepository()
    ) { }

    async register(
        data: RegisterDto
    ) {
        const existingUser =
            await this.userRepository.findByEmail(
                data.email
            );

        if (existingUser) {
            throw new AppError(
                "Email already exists",
                409
            );
        }

        const passwordHash =
            await bcrypt.hash(
                data.password,
                12
            );

        const user =
            await this.userRepository.create({
                name: data.name,
                email: data.email,
                passwordHash,
            });

        return {
            id: user._id,
            name: user.name,
            email: user.email,
        };
    }

    async login(data: LoginDto) {
        const user =
            await this.userRepository.findByEmail(
                data.email
            );

        if (!user) {
            throw new AppError(
                "Invalid credentials",
                401
            );
        }

        const isPasswordValid =
            await bcrypt.compare(
                data.password,
                user.passwordHash
            );

        if (!isPasswordValid) {
            throw new AppError(
                "Invalid credentials",
                401
            );
        }

        const accessToken =
            generateAccessToken({
                userId: user.id,
            });

        const refreshToken =
            generateRefreshToken({
                userId: user.id,
            });

        const tokenHash = crypto
            .createHash("sha256")
            .update(refreshToken)
            .digest("hex");

        await this.refreshTokenRepository.deleteByUserId(
            user.id
        );

        await this.refreshTokenRepository.create({
            userId: user.id,
            tokenHash,
            expiresAt: new Date(
                Date.now() +
                7 * 24 * 60 * 60 * 1000
            ),
        });

        return {
            accessToken,
            refreshToken,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        };
    }
}