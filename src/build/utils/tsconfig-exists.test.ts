import { fs, rmRf } from "../../utils";
import { createTsconfig, tsconfigExists } from "./";

const projectDir = "/tmp/dummy-project";

beforeEach(async () => {
  await rmRf(projectDir);
  await fs.mkdir(projectDir);
});

test("should detect that the project contains a tsconfig.json file", async () => {
  await createTsconfig(projectDir);

  expect(await tsconfigExists(projectDir)).toBe(true);
});

test("should detect that the project does not contain a tsconfig.json file", async () => {
  await rmRf(`${projectDir}/tsconfig.json`);

  expect(await tsconfigExists(projectDir)).toBe(false);
});
