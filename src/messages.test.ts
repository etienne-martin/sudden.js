import {
  getMissingTypeScriptDependenciesMessage,
  getCreatedTsconfigMessage,
  getConflictingEndpointsMessage,
  getMissingEndpointsDirMessage,
  getTypeScriptDetectedMessage
} from "./messages";

test("should get messages", async () => {
  expect(getMissingTypeScriptDependenciesMessage([], "yarn")).toBeDefined();
  expect(getMissingTypeScriptDependenciesMessage([], "npm")).toBeDefined();
  expect(getCreatedTsconfigMessage()).toBeDefined();
  expect(getConflictingEndpointsMessage([])).toBeDefined();
  expect(getMissingEndpointsDirMessage("dir")).toBeDefined();
  expect(getTypeScriptDetectedMessage()).toBeDefined();
});
