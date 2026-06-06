import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";

import { notFoundHandler } from "./shared/middleware/notFound";
import { errorHandler } from "./shared/middleware/errorHandler";

const app = express();

app.use(cors());
app.use(notFoundHandler);
app.use(errorHandler);

app.use(helmet());

app.use(compression());

app.use(express.json());

app.get("/health", (_, res) => {
  res.status(200).json({
    success: true,
    message: "TaskSphere API running"
  });
});

export default app;