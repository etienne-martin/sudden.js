import { semVer } from "./semver";

test("should be compatible if exact same version", () => {
  const buildVersion = semVer.parse("1.0.0");
  const runtimeVersion = semVer.parse("1.0.0");

  expect(buildVersion.isCompatibleWith(runtimeVersion)).toBe(true);
});

test("should be incompatible if major versions are different", () => {
  const buildVersion = semVer.parse("2.0.0");
  const runtimeVersion = semVer.parse("1.0.0");

  expect(buildVersion.isCompatibleWith(runtimeVersion)).toBe(false);
});

test("should be incompatible if major versions are different", () => {
  const buildVersion = semVer.parse("1.0.0");
  const runtimeVersion = semVer.parse("2.0.0");

  expect(buildVersion.isCompatibleWith(runtimeVersion)).toBe(false);
});

test("should be compatible if minor is bigger", () => {
  const buildVersion = semVer.parse("1.1.0");
  const runtimeVersion = semVer.parse("1.2.0");

  expect(buildVersion.isCompatibleWith(runtimeVersion)).toBe(true);
});

test("should be incompatible if minor is smaller", () => {
  const buildVersion = semVer.parse("1.2.0");
  const runtimeVersion = semVer.parse("1.1.0");

  expect(buildVersion.isCompatibleWith(runtimeVersion)).toBe(false);
});

test("should be compatible if only patch changed", () => {
  const buildVersion = semVer.parse("1.0.0");
  const runtimeVersion = semVer.parse("1.0.1");

  expect(buildVersion.isCompatibleWith(runtimeVersion)).toBe(true);
});

test("should be compatible if only patch changed", () => {
  const buildVersion = semVer.parse("1.0.1");
  const runtimeVersion = semVer.parse("1.0.0");

  expect(buildVersion.isCompatibleWith(runtimeVersion)).toBe(true);
});
