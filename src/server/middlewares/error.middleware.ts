import express from "express";

import { SuddenApiError, INTERNAL_SERVER_ERROR } from "../errors";

const handleError = (err: SuddenApiError, res: express.Response) => {
  res.status(err.statusCode);
  res.json({
    error: {
      message: err.message,
      code: err.code
    }
  });
};

// Error middlewares must have 4 arguments
export const errorMiddleware = (
  err: Error | SuddenApiError,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction // eslint-disable-line
) => {
  if ((err as SuddenApiError).type === "SuddenApiError") {
    return handleError(err as SuddenApiError, res);
  }

  // Defaults to 500, internal server error
  handleError(INTERNAL_SERVER_ERROR, res);
};
