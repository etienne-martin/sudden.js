import colors from "colors/safe";

import { detectPackageManager } from "../utils";

export const getMissingTypeScriptDependenciesMessage = (
  missingTypeScriptDependencies: string[]
) => {
  const packageManager = detectPackageManager();
  const installCommand = packageManager === "yarn" ? "yarn add" : "npm install";

  return colors.bold(
    colors.red(
      "It looks like you're trying to use TypeScript but do not have the required package(s) installed.\n\n"
    ) +
      `Please install ${missingTypeScriptDependencies.join(
        " and "
      )} by running:\n\n` +
      colors.cyan(
        `\t${installCommand} --dev ${missingTypeScriptDependencies.join(" ")}`
      ) +
      `\n\nIf you are not trying to use TypeScript, please remove the ${colors.cyan(
        "tsconfig.json"
      )} file from your package root (and any TypeScript files).\n`
  );
};

export const getCreatedTsconfigMessage = () => {
  return (
    colors.yellow(
      `We detected TypeScript in your project and created a ${colors.bold(
        "tsconfig.json"
      )} file for you.\n\n`
    ) +
    colors.bold(
      `Your ${colors.cyan(
        "tsconfig.json"
      )} has been populated with default values.\n`
    )
  );
};
