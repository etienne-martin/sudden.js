import {
  getArgsFromNodeProcess,
  getFrameworkDirFromNodeProcess,
  getOptionsFromNodeProcess,
  getOutputDirFromProjectDir,
  getPortFromOptions,
  getSourceDirFromProjectDirTaskAndArguments,
  getTaskFromArguments
} from "./index.getters";

test("should get arguments that didn't have an option associated with them", () => {
  const args = getArgsFromNodeProcess({
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
  const options = getOptionsFromNodeProcess({
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
  expect(getOutputDirFromProjectDir("/dummy-dir")).toEqual(
    "/dummy-dir/.sudden"
  );
});

test("should get the source dir", () => {
  expect(
    getSourceDirFromProjectDirTaskAndArguments("/dummy-dir", "start", ["start"])
  ).toEqual("/dummy-dir");
});

test("should get the source dir", () => {
  expect(
    getSourceDirFromProjectDirTaskAndArguments("/dummy-dir", "build", [
      "build",
      "./src"
    ])
  ).toEqual("/dummy-dir/src");
});

test("should get the source dir", () => {
  expect(
    getSourceDirFromProjectDirTaskAndArguments("/dummy-dir", undefined, [
      "./src"
    ])
  ).toEqual("/dummy-dir/src");
});

test("should get task from arguments", () => {
  expect(getTaskFromArguments(["start"])).toEqual("start");
});

test("should get task from arguments", () => {
  expect(getTaskFromArguments(["build"])).toEqual("build");
});

test("should get task from arguments", () => {
  expect(getTaskFromArguments(["dev", "./src"])).toEqual("dev");
});

test("should default to dev task if not specified", () => {
  expect(getTaskFromArguments(["./src"])).toEqual("dev");
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
    getFrameworkDirFromNodeProcess({
      mainModule: {
        filename: "/Users/test/framework/bin/sudden"
      }
    } as NodeJS.Process)
  ).toEqual("/Users/test/framework");
});
