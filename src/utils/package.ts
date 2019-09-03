import path from "path";
import { noCacheRequire } from "./no-cache-require";

export const detectPackageManager = (): "yarn" | "npm" | null => {
  const npmConfigRegistry = process.env.npm_config_registry || "";

  if (npmConfigRegistry.includes("registry.yarnpkg.com")) {
    return "yarn";
  }

  if (npmConfigRegistry.includes("registry.npmjs.org")) {
    return "npm";
  }

  return null;
};

export const getPackageJson = (packageDir: string) => {
  try {
    return noCacheRequire(path.resolve(packageDir, "package.json"));
  } catch {
    throw "Cannot find package.json";
  }
};
