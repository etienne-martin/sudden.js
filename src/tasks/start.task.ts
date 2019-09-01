import { logger, semVer } from "../utils";
import { getBuildManifest } from "../build/manifest";
import { serve, setRoutes } from "../server/server";

interface StartTaskOptions {
  outputDir: string;
  port?: number;
}

export const startTask = async ({ outputDir, port }: StartTaskOptions) => {
  logger.wait(`starting the server ...`);

  const buildManifest = getBuildManifest(outputDir);
  const runtimeVersion = semVer.parse(require("../../package.json").version);

  if (
    !buildManifest ||
    (buildManifest && buildManifest.mode !== "production")
  ) {
    logger.error(
      `Could not find a valid build in the '${outputDir}' directory! Try building your API with 'sudden build' before starting the server.`
    );

    return process.exit(1);
  }

  const buildVersion = semVer.parse(buildManifest.version);

  if (!buildVersion.isCompatibleWith(runtimeVersion)) {
    logger.error(
      `The build version of your API (${buildVersion.toString()}) is not compatible with sudden@${runtimeVersion.toString()}`
    );

    return process.exit(1);
  }

  await setRoutes(outputDir, () => {
    process.exit(1);
  });

  await serve({
    mode: "production",
    port
  });
};
