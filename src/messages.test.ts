import {
  getMissingTypeScriptDependenciesMessage,
  getCreatedTsconfigMessage,
  getConflictingEndpointsMessage,
  getMissingEndpointsDirMessage,
  getTypeScriptDetectedMessage
} from "./messages";

test("should get message", async () => {
  expect(getMissingTypeScriptDependenciesMessage([], "yarn")).toBeDefined();
  expect(getMissingTypeScriptDependenciesMessage([], "npm")).toBeDefined();
});

test("should get message", async () => {
  expect(getCreatedTsconfigMessage()).toBeDefined();
});

test("should get message", async () => {
  expect(getConflictingEndpointsMessage([])).toBeDefined();
});

test("should get message", async () => {
  expect(getMissingEndpointsDirMessage("dir")).toBeDefined();
});

test("should get message", async () => {
  expect(getTypeScriptDetectedMessage()).toBeDefined();
});
