import path from "path";

import { fs } from "../utils";

export const createEntrypoint = async (
  sourceDir: string,
  outputDir: string
) => {
  const endpointsDir = path.resolve(sourceDir, "endpoints");
  const entrypoint = `export default (require as any).context('${endpointsDir}', true, /\\.(js|ts|json)$/);`;
  const entrypointPath = path.resolve(outputDir, "entrypoint.ts");

  // Write file to disk
  await fs.mkdir(outputDir, { recursive: true });
  await fs.writeFile(entrypointPath, entrypoint);
};
