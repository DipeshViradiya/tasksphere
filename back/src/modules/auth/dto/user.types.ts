import { Types } from "mongoose";

export interface IUser {
    _id: Types.ObjectId;

    name: string;

    email: string;

    passwordHash: string;

    isActive: boolean;

    deletedAt: Date | null;

    createdAt: Date;

    updatedAt: Date;
}