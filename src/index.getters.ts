import minimist from "minimist";
import path from "path";

export const getArgsFromNodeProcess = (nodeProcess: NodeJS.Process) => {
  const { _: args } = minimist(nodeProcess.argv.slice(2));

  return args;
};

export const getOptionsFromNodeProcess = (nodeProcess: NodeJS.Process) => {
  const { _, ...OPTIONS } = minimist(nodeProcess.argv.slice(2)); // eslint-disable-line

  return OPTIONS;
};

export const getOutputDirFromProjectDir = (projectDir: string) => {
  return path.resolve(projectDir, ".sudden");
};

export const getSourceDirFromProjectDirTaskAndArguments = (
  projectDir: string,
  task: string | undefined,
  args: any[]
) => {
  return path.resolve(projectDir, (task ? args[1] : args[0]) || "./");
};

export const getTaskFromArguments = (
  args: any[]
): "build" | "start" | undefined => {
  return ["build", "start"].includes(args[0]) ? args[0] : undefined;
};

export const getPortFromOptions = (options: { [key: string]: any }) => {
  return (
    parseInt((options.port || options.p || "").toString(), 10) || undefined
  );
};

export const getFrameworkDirFromNodeProcess = (nodeProcess: NodeJS.Process) => {
  return path.resolve(nodeProcess.mainModule!.filename, "../../"); // eslint-disable-line
};
