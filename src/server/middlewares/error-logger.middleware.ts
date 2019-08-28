import express from "express";

import { logger } from "../../utils";
import { SuddenApiError } from "../errors";

// Error middlewares must have 4 arguments
export const errorLoggerMiddleware = (
  err: Error | SuddenApiError,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  logger.error(err);
  next(err);
};
