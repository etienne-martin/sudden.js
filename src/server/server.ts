import express from "express";
import "express-async-errors"; // <-- Must be required after express
import cookieParser from "cookie-parser";

import { errorMiddleware } from "./middlewares/error.middleware";
import { errorLoggerMiddleware } from "./middlewares/error-logger.middleware";
import { notFoundMiddleware } from "./middlewares/not-found.middleware";
import { bodyParserMiddleware } from "./middlewares/body-parser.middleware";
import { securityMiddleware } from "./middlewares/security.middleware";
import { convertFileNameToRoute, getCompiledEndpoints } from "./router/utils";
import { logger } from "../utils";
import { findConflictingEndpoints } from "./router/utils/route-conflict";
import { getConflictingEndpointsMessage } from "../messages";

interface ServerOptions {
  port?: number;
  mode: "production" | "development";
}

let app: express.Application;
let router: express.Router;

const loadModule = (
  module: any,
  instance: express.Router | express.Application,
  onError?: (err: Error) => void
) => {
  if (!module) return;

  try {
    module().default(instance);
  } catch (err) {
    logger.error(err);

    if (onError) onError(err);
  }
};

export const setRoutes = async (
  outputDir: string,
  onError?: (err: Error) => void
) => {
  try {
    logger.wait(!router ? "setting routes ..." : "updating routes ...");

    if (!app) app = express();

    const newRouter = express.Router();
    const endpoints = await getCompiledEndpoints(outputDir);
    const conflictingEndpoints = findConflictingEndpoints(endpoints);

    if (conflictingEndpoints.length > 0) {
      logger.error(getConflictingEndpointsMessage(conflictingEndpoints));
    }

    const appModule = (endpoints.find((item: any) => item[0] === "_app") ||
      [])[1];
    const routerModule = (endpoints.find(
      (item: any) => item[0] === "_router"
    ) || [])[1];
    const errorMiddlewareModule = (endpoints.find(
      (item: any) => item[0] === "_error"
    ) || [])[1];

    loadModule(appModule, app, onError);
    loadModule(routerModule, newRouter, onError);

    for (const [fileName, getModule, fileExtension] of endpoints) {
      const { routeName, method } = convertFileNameToRoute(fileName);

      // Skip private routes
      if (fileName.startsWith("_")) continue;

      try {
        const module = getModule();
        const requestHandler = module.default;

        if (fileExtension === "json") {
          newRouter[method](routeName, (req, res) => {
            res.json(module);
          });

          continue;
        }

        if (typeof requestHandler !== "function") {
          throw "Endpoints must export a request handler function.";
        }

        newRouter[method](routeName, (req, res) => {
          // Unescape dots and hyphens
          const params: {
            [key: string]: any;
          } = {};

          Object.entries(req.params).map(([key, value]) => {
            key = key.replace(/_DOT_/g, ".").replace(/_HYPHEN_/g, "-");
            params[key] = value;
          });

          req.params = params;

          requestHandler(req, res);
        });
      } catch (err) {
        logger.error(
          `Unable to set endpoint: ${fileName}.${fileExtension}
`,
          err
        );

        // Throw the same error when hitting the endpoint
        newRouter[method](routeName, () => {
          throw err;
        });

        if (onError) onError(err);
      }
    }

    // Built-in error logger
    // Declared before the not_found middleware to prevent logging 404s
    newRouter.use(errorLoggerMiddleware);

    // 404s
    newRouter.use(notFoundMiddleware);

    // Custom error handling
    if (errorMiddlewareModule) {
      try {
        newRouter.use(
          (
            err: Error,
            req: express.Request,
            res: express.Response,
            next: express.NextFunction
          ) => {
            errorMiddlewareModule().default(err, req, res);
            next(err);
          }
        );
      } catch (err) {
        logger.error(err);

        if (onError) onError(err);
      }
    }

    // Built-in error handling
    newRouter.use(errorMiddleware);

    router = newRouter;

    logger.ready("routes ready");
  } catch (err) {
    logger.error(err);

    if (onError) onError(err);
  }
};

export const serve = async (options: ServerOptions) =>
  new Promise((resolve, reject) => {
    const { port = 3000, mode } = options;

    app.set("env", mode);
    app.set("etag", false);
    app.set("json spaces", 2);
    app.disable("x-powered-by");
    app.use(securityMiddleware);
    app.use(cookieParser());
    app.use(bodyParserMiddleware);
    app.use((...args) => router(...args));

    app
      .listen(port, () => {
        logger.ready(`server ready on http://localhost:${port}`);
        resolve();
      })
      .on("error", err => {
        if (mode === "development" && err.message.includes("EADDRINUSE")) {
          return reject(
            `Port ${port} is already in use. \nUse "sudden -p <some other port>".`
          );
        }

        reject(err);
      });
  });
