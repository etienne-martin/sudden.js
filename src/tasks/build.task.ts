import path from "path";

import { fs, logger, rmRf } from "../utils";
import { createEntrypoint } from "../build/entrypoint";
import { build } from "../build/build";
import { containsTypeScript } from "../build/utils";

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
    logger.error(
      `Couldn't find a 'endpoints' directory. Please create one under ${sourceDir}`
    );

    return process.exit(1);
  }

  await rmRf(outputDir);
  await createEntrypoint(sourceDir, outputDir);

  try {
    await build({
      mode: "production",
      context: frameworkDir,
      runtimeVersion,
      projectDir,
      outputDir,
      entry: {
        endpoints: path.resolve(outputDir, "entrypoint.ts")
      },
      typescript: await containsTypeScript(endpointsDir),
      logger
    });
  } catch (err) {
    await rmRf(outputDir);
    throw err;
  }
};
