import { startTask } from "./start.task";
import { buildTask } from "./build.task";
import { devTask } from "./dev.task";
import { Task } from "../typings/tasks";

interface TaskRunnerOptions {
  runtimeVersion: string;
  frameworkDir: string;
  projectDir: string;
  sourceDir: string;
  outputDir: string;
  port?: number;
}

export const taskRunner = async (
  task: Task | undefined,
  {
    outputDir,
    port,
    runtimeVersion,
    frameworkDir,
    projectDir,
    sourceDir
  }: TaskRunnerOptions
) => {
  switch (task) {
    case "start":
      await startTask({
        outputDir,
        port,
        runtimeVersion
      });
      break;
    case "build":
      await buildTask({
        outputDir,
        runtimeVersion,
        frameworkDir,
        projectDir,
        sourceDir
      });
      break;
    default:
      await devTask({
        runtimeVersion,
        frameworkDir,
        projectDir,
        sourceDir,
        outputDir,
        port
      });
  }
};
