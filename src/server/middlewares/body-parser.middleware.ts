import express from "express";
import bodyParser from "body-parser";

export const bodyParserMiddleware = [
  // Parse application/json
  express.json(),
  // Parse application/x-www-form-urlencoded
  express.urlencoded({ extended: true }),
  // Parse text/plain
  bodyParser.text()
];
