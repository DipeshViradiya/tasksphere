import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";

import { notFoundHandler } from "./shared/middleware/notFound";
import { errorHandler } from "./shared/middleware/errorHandler";

import authRoutes from "./modules/auth/routes/auth.routes";

const app = express();

app.use(cors());
app.use(helmet());

app.use(compression());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/health", (_, res) => {
  res.status(200).json({
    success: true,
    message: "TaskSphere API running"
  });
});
app.use(
  "/api/auth",
  authRoutes
);
app.use(notFoundHandler);
app.use(errorHandler);

export default app;