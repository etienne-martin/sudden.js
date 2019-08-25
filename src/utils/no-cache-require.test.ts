import { fs } from "./fs";
import { noCacheRequire } from "./no-cache-require";

const createModule = async (content: number) => {
  await fs.writeFile("/tmp/dummy-module.js", `module.exports = ${content};`);
};

test("should not pull the module from cache", async () => {
  await createModule(1);

  expect(noCacheRequire("/tmp/dummy-module")).toBe(1);

  jest.resetModules();

  await createModule(2);

  expect(noCacheRequire("/tmp/dummy-module")).toBe(2);
});
