import winston from "winston";

const isDev = process.env.NODE_ENV === "development";

export const logger = winston.createLogger({
  level: "info",

  format: isDev
    ? winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp(),
        winston.format.simple()
      )
    : winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.json()
      ),

  transports: [
    new winston.transports.Console(),

    new winston.transports.File({
      filename: "logs/error.log",
      level: "error",
    }),

    new winston.transports.File({
      filename: "logs/app.log",
    }),
  ],
});