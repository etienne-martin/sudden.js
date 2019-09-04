import path from "path";

import { fs, logger, rmRf } from "../utils";
import { createEntrypoint } from "../build/entrypoint";
import { build } from "../build/build";
import { containsTypeScript } from "../build/utils";
import { getCompiledEndpoints } from "../server/router/utils";
import { findConflictingEndpoints } from "../server/router/utils/route-conflict";

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

  const conflictingEndpoints = findConflictingEndpoints(
    await getCompiledEndpoints(outputDir)
  );

  if (conflictingEndpoints.length > 0) {
    // TODO: create a reusable "message" for that
    logger.error(
      `Multiple endpoints are being assigned to the same route.
      
Conflicting endpoints:
${conflictingEndpoints.join("\n")}
`
    );

    return process.exit(1);
  }
};
