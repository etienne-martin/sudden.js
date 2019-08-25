import { fs, rmRf } from "../../utils";
import { findMissingTypeScriptDependencies } from "./";

const projectDir = "/tmp/dummy-project";

beforeEach(async () => {
  await rmRf(projectDir);
  await fs.mkdir(projectDir);
  await fs.mkdir(`${projectDir}/node_modules`);
});

test("should find missing dependencies", async () => {
  expect(await findMissingTypeScriptDependencies(projectDir)).toEqual([
    "typescript",
    "@types/node"
  ]);
});

test("should report no missing dependencies", async () => {
  await fs.mkdir(`${projectDir}/node_modules/typescript`);
  await fs.mkdir(`${projectDir}/node_modules/@types`);
  await fs.mkdir(`${projectDir}/node_modules/@types/node`);

  expect(await findMissingTypeScriptDependencies(projectDir)).toEqual([]);
});
