import path from "path";

import { fs } from "../../utils";

export const findMissingTypeScriptDependencies = async (
  projectDir: string
): Promise<string[]> => {
  const requiredDependencies = ["typescript", "@types/node"];
  const missingDependencies = [];

  for (const dependency of requiredDependencies) {
    if (
      !(await fs.exists(path.resolve(projectDir, "node_modules", dependency)))
    ) {
      missingDependencies.push(dependency);
    }
  }

  return missingDependencies;
};
