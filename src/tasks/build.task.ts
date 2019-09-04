import path from "path";

import { fs, logger, rmRf } from "../utils";
import { createEntrypoint } from "../build/entrypoint";
import { build } from "../build/build";
import { containsTypeScript } from "../build/utils";
import {
  convertFileNameToRoute,
  getCompiledEndpoints
} from "../server/router/utils";

interface BuildTaskOptions {
  runtimeVersion: string;
  frameworkDir: string;
  projectDir: string;
  sourceDir: string;
  outputDir: string;
}

export const buildTask = async ({
  runtimeVersion,
  frameworkDir,
  projectDir,
  sourceDir,
  outputDir
}: BuildTaskOptions) => {
  const endpointsDir = path.resolve(sourceDir, "endpoints");

  if (!(await fs.exists(endpointsDir))) {
    throw `Couldn't find a 'endpoints' directory. Please create one under ${sourceDir}`;
  }

  await rmRf(outputDir);

  try {
    await build({
      mode: "production",
      context: frameworkDir,
      runtimeVersion,
      projectDir,
      outputDir,
      entry: await createEntrypoint(sourceDir),
      typescript: await containsTypeScript(endpointsDir),
      logger
    });
  } catch (err) {
    await rmRf(outputDir);
    throw err;
  }

  // Check for route conflicts
  const endpoints = await getCompiledEndpoints(outputDir);
  const registeredEndpoints: {
    [routeName: string]: string;
  } = {};

  for (const [fileName] of endpoints) {
    const { routeName, method } = convertFileNameToRoute(fileName);

    if (registeredEndpoints[routeName]) {
      if (registeredEndpoints[routeName] === method || method === "all") {
        throw "Another endpoint is already assigned to this route.";
      }
    }

    registeredEndpoints[routeName] = method;
  }
};
