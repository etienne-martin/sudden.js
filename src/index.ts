import express from "express";

import { taskRunner } from "./tasks/task-runner";
import {
  logger,
  getPackageJson,
  getArguments,
  getFrameworkDir,
  getOptions,
  getOutputDir,
  getPortFromOptions,
  getSourceDir,
  getTask
} from "./utils";

// Export types
export type Application = express.Application;
export type Router = express.Router;
export type Request = express.Request;
export type Response = express.Response;
export type NextFunction = express.NextFunction;

const projectDir = process.cwd();
const outputDir = getOutputDir(projectDir);
const frameworkDir = getFrameworkDir(process);
const runtimeVersion = getPackageJson(frameworkDir).version;
const args = getArguments(process);
const options = getOptions(process);
const task = getTask(args);
const port = getPortFromOptions(options);
const sourceDir = getSourceDir(projectDir, task, args);

process.on("unhandledRejection", err => {
  if (err) logger.error(err);
  process.exit(1);
});

(async () => {
  await taskRunner(task, {
    runtimeVersion,
    frameworkDir,
    projectDir,
    sourceDir,
    outputDir,
    port
  });
})();
