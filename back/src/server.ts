import app from "./app";
import { env } from "./config/env";
import { logger } from "./shared/logger/logger";
import { connectMongo } from "./infrastructure/mongo/connection";
import { connectRedis } from "./infrastructure/redis/connection";
import mongoose from "mongoose";

app.listen(env.PORT, async () => {
    await connectMongo();

    await connectRedis();
    logger.info(`Server running on port ${env.PORT}`);
});

process.on("SIGINT", async () => {
    await mongoose.disconnect();

    logger.info("MongoDB disconnected");

    process.exit(0);
});