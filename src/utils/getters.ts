import minimist from "minimist";
import path from "path";
import { Task } from "../typings/tasks";

export const getArguments = (nodeProcess: NodeJS.Process) => {
  const { _: args } = minimist(nodeProcess.argv.slice(2));

  return args;
};

export const getOptions = (nodeProcess: NodeJS.Process) => {
  const { _, ...OPTIONS } = minimist(nodeProcess.argv.slice(2)); // eslint-disable-line

  return OPTIONS;
};

export const getOutputDir = (projectDir: string) => {
  return path.resolve(projectDir, ".sudden");
};

export const getSourceDir = (
  projectDir: string,
  task: string | undefined,
  args: any[]
) => {
  return path.resolve(projectDir, (task ? args[1] : args[0]) || "./");
};

export const getTask = (args: any[]): Task => {
  return ["build", "start", "dev"].includes(args[0]) ? args[0] : "dev";
};

export const getPortFromOptions = (options: { [key: string]: any }) => {
  return (
    parseInt((options.port || options.p || "").toString(), 10) || undefined
  );
};

export const getFrameworkDir = (nodeProcess: NodeJS.Process) => {
  return path.resolve(nodeProcess.mainModule!.filename, "../../"); // eslint-disable-line
};
