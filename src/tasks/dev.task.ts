import { watch } from "chokidar";
import touch from "touch";
import clear from "console-clear";
import path from "path";

import { logger, fs, rmRf } from "../utils";
import { createEntrypoint } from "../build/entrypoint";
import { build } from "../build/build";
import { serve, setRoutes } from "../server/server";
import { containsTypeScript } from "../build/utils";
import {
  getMissingEndpointsDirMessage,
  getTypeScriptDetectedMessage
} from "../messages";

interface DevTaskOptions {
  runtimeVersion: string;
  frameworkDir: string;
  projectDir: string;
  sourceDir: string;
  outputDir: string;
  port?: number;
}

export const devTask = async ({
  runtimeVersion,
  frameworkDir,
  projectDir,
  sourceDir,
  outputDir,
  port
}: DevTaskOptions) => {
  clear();

  const endpointsDir = path.resolve(sourceDir, "endpoints");

  logger.wait("starting the development server ...");

  if (!(await fs.exists(endpointsDir))) {
    throw getMissingEndpointsDirMessage(sourceDir);
  }

  const hasTypeScript = await containsTypeScript(endpointsDir);

  await rmRf(outputDir);

  await build({
    mode: "development",
    context: frameworkDir,
    runtimeVersion,
    projectDir,
    outputDir,
    entry: await createEntrypoint(sourceDir),
    typescript: hasTypeScript,
    logger,
    watch: true,
    onCompilationEnd: async () => await setRoutes(outputDir)
  });

  const watcher = watch(`${endpointsDir}/**/*.{js,ts,json}`, {
    ignoreInitial: true,
    persistent: true
  });

  watcher.on("add", async filePath => {
    // Because of a bug with webstorm/intellij we must "touch" new file so that webpack's watcher detects changes
    // https://webpack.js.org/configuration/watch/#saving-in-webstorm
    // https://stackoverflow.com/a/48361075/1123556
    await touch(filePath);

    if (!hasTypeScript && filePath.toLowerCase().endsWith(".ts")) {
      logger.warn(getTypeScriptDetectedMessage());
    }
  });

  await serve({
    mode: "development",
    port
  });
};
