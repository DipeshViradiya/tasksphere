import { Schema, model, Types } from "mongoose";

const refreshTokenSchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    tokenHash: {
      type: String,
      required: true,
    },

    expiresAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const RefreshToken = model(
  "RefreshToken",
  refreshTokenSchema
);