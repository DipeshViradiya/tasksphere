import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum([
    "development",
    "test",
    "production",
  ]),

  PORT: z.coerce.number(),

  MONGO_URI: z.string().min(1),

  REDIS_URL: z.string().min(1),

  JWT_ACCESS_SECRET: z.string().min(5),

  JWT_REFRESH_SECRET: z.string().min(5),

  ACCESS_TOKEN_EXPIRES_IN: z.string(),
  REFRESH_TOKEN_EXPIRES_IN: z.string(),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error(
    "❌ Invalid Environment Variables"
  );

  console.error(
    parsedEnv.error.flatten().fieldErrors
  );

  process.exit(1);
}

export const env = parsedEnv.data;