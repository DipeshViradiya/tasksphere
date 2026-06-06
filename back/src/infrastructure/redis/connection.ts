import Redis from "ioredis";

import { env } from "../../config/env";
import { logger } from "../../shared/logger/logger";

export const redis = new Redis(env.REDIS_URL, {
    maxRetriesPerRequest: 3,
});

redis.on("connect", () => {
    logger.info("Redis connected");
});

redis.on("error", (error) => {
    logger.error("Redis connection error", {
        error,
    });
});

export const connectRedis = async (): Promise<void> => {
    try {
        await redis.ping();

        logger.info("Redis ping successful");
    } catch (error) {
        logger.error("Redis ping failed", {
            error,
        });

        process.exit(1);
    }
};