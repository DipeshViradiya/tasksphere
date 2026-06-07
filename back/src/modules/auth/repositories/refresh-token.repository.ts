import { RefreshToken } from "../refresh-token.model";

export class RefreshTokenRepository {
  async create(data: {
    userId: string;
    tokenHash: string;
    expiresAt: Date;
  }) {
    return RefreshToken.create(data);
  }

  async findByUserId(userId: string) {
    return RefreshToken.findOne({ userId });
  }

  async deleteByUserId(userId: string) {
    return RefreshToken.deleteMany({ userId });
  }
  
}