import mongoose from "mongoose";

import { env } from "../../config/env";

import { logger } from "../../shared/logger/logger";

export const connectMongo = async () => {
    try {
        await mongoose.connect(env.MONGO_URI);

        logger.info("MongoDB connected");
    } catch (error) {
        logger.error("MongoDB connection failed", {
            error,
        });

        process.exit(1);
    }
};