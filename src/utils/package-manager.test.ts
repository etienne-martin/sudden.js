import { detectPackageManager } from "./package-manager";

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
