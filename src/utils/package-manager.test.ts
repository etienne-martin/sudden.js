import { detectPackageManager, getPackageJson } from "./package-manager";
import { fs } from "./fs";
import { rmRf } from "./rm-rf";

const currentNpmConfigRegistry = process.env.npm_config_registry;

afterAll(() => {
  // Reset env var
  process.env.npm_config_registry = currentNpmConfigRegistry;
});

test("should detect yarn", async () => {
  process.env.npm_config_registry = "https://registry.yarnpkg.com";

  expect(await detectPackageManager()).toBe("yarn");
});

test("should detect npm", async () => {
  process.env.npm_config_registry = "https://registry.npmjs.org/";

  expect(await detectPackageManager()).toBe("npm");
});

test("should return undefined if nothing is detected", async () => {
  delete process.env.npm_config_registry;

  expect(await detectPackageManager()).toBe(null);
});

test("should get package.json from package directory", async () => {
  await rmRf("/tmp/dummy-package");
  await fs.mkdir("/tmp/dummy-package");
  await fs.writeFile(
    "/tmp/dummy-package/package.json",
    JSON.stringify({ test: 1 })
  );

  expect(typeof getPackageJson("/tmp/dummy-package")).toBe("object");
});

test("should throw if cannot find package.json", async () => {
  let thrownError: Error | undefined;

  await rmRf("/tmp/dummy-package");

  jest.resetModules();

  try {
    getPackageJson("/tmp/dummy-package");
  } catch (err) {
    thrownError = err;
  }

  expect(thrownError).toEqual("Cannot find package.json");
});
