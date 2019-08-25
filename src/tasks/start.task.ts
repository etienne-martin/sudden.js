import { logger } from "../utils";
import { getBuildManifest } from "../build/manifest";
import { serve, setRoutes } from "../server/server";

interface StartTaskOptions {
  outputDir: string;
  port?: number;
}

export const startTask = async ({ outputDir, port }: StartTaskOptions) => {
  logger.wait(`starting the server ...`);

  const buildManifest = getBuildManifest(outputDir);

  if (
    !buildManifest ||
    (buildManifest && buildManifest.mode !== "production")
  ) {
    logger.error(
      `Could not find a valid build in the '${outputDir}' directory! Try building your API with 'sudden build' before starting the server.`
    );
    process.exit(1);
  }

  await setRoutes(outputDir, () => {
    process.exit(1);
  });

  await serve({
    mode: "production",
    port
  });
};
