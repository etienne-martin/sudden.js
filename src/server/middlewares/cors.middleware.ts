import express from "express";

export const corsMiddleware = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Max-Age", "300");

  next();
};
