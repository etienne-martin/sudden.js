import { taskRunner } from "../tasks/task-runner";
import { getOutputDirFromProjectDir } from "../index.getters";
import { fs } from "../utils/fs";
import { rmRf } from "../utils";

beforeAll(async () => {
  await rmRf("/tmp/dummy-project-integration");
  await fs.mkdir("/tmp/dummy-project-integration");
  await fs.mkdir("/tmp/dummy-project-integration/endpoints");
  await fs.writeFile(
    "/tmp/dummy-project-integration/endpoints/index.js",
    `
export default (req, res) => {
  res.json({
    hello: "world!!!"
  });
};`
  );
});

test.skip("should create a production build", async () => {
  const frameworkDir = process.cwd();
  const projectDir = "/tmp/dummy-project-integration";
  const sourceDir = "/tmp/dummy-project-integration";
  const outputDir = getOutputDirFromProjectDir(projectDir);
  const task = "build";
  const port = 3333;

  await taskRunner({
    task,
    frameworkDir,
    projectDir,
    sourceDir,
    outputDir,
    port
  });
});

test.skip("should start a production server", async () => {
  const frameworkDir = process.cwd();
  const projectDir = "/tmp/dummy-project-integration";
  const sourceDir = "/tmp/dummy-project-integration";
  const outputDir = getOutputDirFromProjectDir(projectDir);

  await taskRunner({
    task: "start",
    frameworkDir,
    projectDir,
    sourceDir,
    outputDir,
    port: 3333
  });
});
