import { Schema, model } from "mongoose";
import { UserRole } from "../../shared/constants/roles";

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
        },

        passwordHash: {
            type: String,
            required: true,
        },

        role: {
            type: String,
            enum: Object.values(UserRole),
            default: UserRole.MEMBER,
        },

        isActive: {
            type: Boolean,
            default: true,
        },
        deletedAt: {
            type: Date,
            default: null,
        }
    },
    {
        timestamps: true,
    }
);

userSchema.index(
    {
        email: 1,
    },
    {
        unique: true,
    }
);

export const User = model(
    "User",
    userSchema
);