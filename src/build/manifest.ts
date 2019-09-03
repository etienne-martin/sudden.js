import path from "path";

import { BuildManifest } from "./webpack/build-manifest-plugin/build-manifest-plugin";
import { noCacheRequire } from "../utils";

export const getBuildManifest = (
  outputDir: string
): BuildManifest | undefined => {
  try {
    return noCacheRequire(path.resolve(outputDir, "build-manifest.json"));
  } catch {
    // Do nothing
  }
};
