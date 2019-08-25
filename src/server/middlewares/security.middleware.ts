import express from "express";

export const securityMiddleware = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  res.set(
    "Strict-Transport-Security",
    `max-age=${60 * 60 * 24 * 365}; includeSubDomains; preload`
  );

  next();
};
