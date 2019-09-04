import { semVer } from "./semver";

test("should parse the version string", () => {
  const parsedVersion = semVer.parse("1.0.0");

  expect(parsedVersion.major).toBe(1);
  expect(parsedVersion.minor).toBe(0);
  expect(parsedVersion.patch).toBe(0);
});

test("should parse malformed version strings", () => {
  const parsedVersion = semVer.parse(" 1.0 .0 ");

  expect(parsedVersion.major).toBe(1);
  expect(parsedVersion.minor).toBe(0);
  expect(parsedVersion.patch).toBe(0);
});

test("should throw if the version string is invalid", () => {
  let thrownError: Error | undefined;

  try {
    semVer.parse("x.x.x");
  } catch (err) {
    thrownError = err;
  }

  expect(thrownError).toEqual("Invalid version string");
});

test("should convert it back to a version string", () => {
  expect(semVer.parse("1.0 .0").toString()).toBe("1.0.0");
});

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
