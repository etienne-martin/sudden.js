import express from "express";

import { taskRunner } from "./tasks/task-runner";
import { logger } from "./utils";
import {
  getArgsFromNodeProcess,
  getFrameworkDirFromNodeProcess,
  getOptionsFromNodeProcess,
  getOutputDirFromProjectDir,
  getPortFromOptions,
  getSourceDirFromProjectDirTaskAndArguments,
  getTaskFromArguments,
  getRuntimeVersionFromPackageJson
} from "./index.getters";

// Export types
export type Application = express.Application;
export type Router = express.Router;
export type Request = express.Request;
export type Response = express.Response;
export type NextFunction = express.NextFunction;

const projectDir = process.cwd();
const outputDir = getOutputDirFromProjectDir(projectDir);
const frameworkDir = getFrameworkDirFromNodeProcess(process);
const runtimeVersion = getRuntimeVersionFromPackageJson(frameworkDir);
const args = getArgsFromNodeProcess(process);
const options = getOptionsFromNodeProcess(process);
const task = getTaskFromArguments(args);
const port = getPortFromOptions(options);
const sourceDir = getSourceDirFromProjectDirTaskAndArguments(
  projectDir,
  task,
  args
);

process.on("unhandledRejection", err => {
  if (Array.isArray(err)) {
    err.map(err => logger.error(err));
  } else {
    logger.error(err);
  }

  process.exit(1);
});

(async () => {
  await taskRunner({
    task,
    runtimeVersion,
    frameworkDir,
    projectDir,
    sourceDir,
    outputDir,
    port
  });
})();
