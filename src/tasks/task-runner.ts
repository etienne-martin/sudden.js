import { startTask } from "./start.task";
import { buildTask } from "./build.task";
import { devTask } from "./dev.task";

interface TaskRunnerOptions {
  task: string | undefined;
  frameworkDir: string;
  projectDir: string;
  sourceDir: string;
  outputDir: string;
  port?: number;
}

export const taskRunner = async ({
  task,
  ...otherOptions
}: TaskRunnerOptions) => {
  switch (task) {
    case "start":
      await startTask(otherOptions);
      break;
    case "build":
      await buildTask(otherOptions);
      break;
    default:
      await devTask(otherOptions);
  }
};
