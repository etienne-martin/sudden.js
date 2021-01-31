import {
  getArguments,
  getFrameworkDir,
  getOptions,
  getOutputDir,
  getPortFromOptions,
  getSourceDir,
  getTask
} from "./getters";

test("should get arguments that didn't have an option associated with them", () => {
  const args = getArguments({
    argv: [
      "/usr/local/bin/node",
      "/usr/local/bin/sudden",
      "start",
      "-p",
      "3333"
    ]
  } as NodeJS.Process);

  expect(args).toEqual(["start"]);
});

test("should get arguments that have an option associated with them", () => {
  const options = getOptions({
    argv: [
      "/usr/local/bin/node",
      "/usr/local/bin/sudden",
      "start",
      "-p",
      "3333"
    ]
  } as NodeJS.Process);

  expect(options).toEqual({ p: 3333 });
});

test("should get the output dir", () => {
  expect(getOutputDir("/dummy-dir")).toEqual("/dummy-dir/.sudden");
});

test("should get the source dir", () => {
  expect(getSourceDir("/dummy-dir", "start", ["start"])).toEqual("/dummy-dir");
});

test("should get the source dir", () => {
  expect(getSourceDir("/dummy-dir", "build", ["build", "./src"])).toEqual(
    "/dummy-dir/src"
  );
});

test("should get the source dir", () => {
  expect(getSourceDir("/dummy-dir", undefined, ["./src"])).toEqual(
    "/dummy-dir/src"
  );
});

test("should get task from arguments", () => {
  expect(getTask(["start"])).toEqual("start");
});

test("should get task from arguments", () => {
  expect(getTask(["build"])).toEqual("build");
});

test("should get task from arguments", () => {
  expect(getTask(["dev", "./src"])).toEqual("dev");
});

test("should default to dev task if not specified", () => {
  expect(getTask(["./src"])).toEqual("dev");
});

test("should get port from options", () => {
  expect(getPortFromOptions({ p: 3333 })).toEqual(3333);
});

test("should get port from options", () => {
  expect(getPortFromOptions({ port: 3333 })).toEqual(3333);
});

test("should get port from options (not specified)", () => {
  expect(getPortFromOptions({})).toEqual(undefined);
});

test("should get framework dir from node process", () => {
  expect(
    getFrameworkDir({
      mainModule: {
        filename: "/Users/test/framework/bin/sudden"
      }
    } as NodeJS.Process)
  ).toEqual("/Users/test/framework");
});
