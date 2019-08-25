import { fs, rmRf } from "../../utils";
import { createTsconfig, tsconfigExists } from "./";

const projectDir = "/tmp/dummy-project";

beforeEach(async () => {
  await rmRf(projectDir);
  await fs.mkdir(projectDir);
});

test("should create tsconfig.json", async () => {
  await rmRf(`${projectDir}/tsconfig.json`);
  await createTsconfig(projectDir);

  expect(await tsconfigExists(projectDir)).toBe(true);
});
