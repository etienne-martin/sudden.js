import { fs, rmRf } from "../../utils";
import { containsTypeScript } from "./";

const endpointsDir = "/tmp/dummy-endpoints";

beforeEach(async () => {
  await rmRf(endpointsDir);
  await fs.mkdir(endpointsDir);
});

test("should detect that the folder contains some typescript files", async () => {
  await fs.writeFile(`${endpointsDir}/index.ts`, "");

  expect(await containsTypeScript(endpointsDir)).toBe(true);
});

test("should detect that the folder contains some typescript files (recursive)", async () => {
  await fs.mkdir(`${endpointsDir}/sub-folder`);
  await fs.writeFile(`${endpointsDir}/sub-folder/index.ts`, "");

  expect(await containsTypeScript(endpointsDir)).toBe(true);
});

test("should detect that the folder does not contain any typescript files", async () => {
  expect(await containsTypeScript(endpointsDir)).toBe(false);
});
