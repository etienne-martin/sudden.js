import { logger, semVer } from "../utils";
import { getBuildManifest } from "../build/manifest";
import { serve, setRoutes } from "../server/server";

interface StartTaskOptions {
  runtimeVersion: string;
  outputDir: string;
  port?: number;
}

export const startTask = async ({
  outputDir,
  port,
  runtimeVersion
}: StartTaskOptions) => {
  logger.wait(`starting the server ...`);

  const buildManifest = getBuildManifest(outputDir);

  if (
    !buildManifest ||
    (buildManifest && buildManifest.mode !== "production")
  ) {
    throw `Could not find a valid build in the '${outputDir}' directory! Try building your API with 'sudden build' before starting the server.`;
  }

  const buildRuntimeVersion = semVer.parse(buildManifest.runtimeVersion);

  if (!buildRuntimeVersion.isCompatibleWith(semVer.parse(runtimeVersion))) {
    throw `The build version of your API (${buildRuntimeVersion.toString()}) is incompatible with sudden@${runtimeVersion}`;
  }

  await setRoutes(outputDir, () => {
    process.exit(1);
  });

  await serve({
    mode: "production",
    port
  });
};
