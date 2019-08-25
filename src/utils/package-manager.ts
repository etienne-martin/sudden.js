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
