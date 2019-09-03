import path from "path";
import os from "os";

import { fs } from "../utils";

export const createEntrypoint = async (sourceDir: string) => {
  const endpointsDir = path.resolve(sourceDir, "endpoints");
  const entrypoint = `export default (require as any).context('${endpointsDir}', true, /\\.(js|ts|json)$/);`;
  const tmpEntrypointDir = await fs.mkdtemp(path.join(os.tmpdir(), ".sudden-"));
  const entrypointPath = path.resolve(tmpEntrypointDir, "entrypoint.ts");

  await fs.writeFile(entrypointPath, entrypoint);

  return await fs.realpath(entrypointPath);
};
