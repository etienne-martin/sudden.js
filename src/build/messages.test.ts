import { getMissingTypeScriptDependenciesMessage, getCreatedTsconfigMessage } from "./messages";

test("should get message", async () => {
  expect(getMissingTypeScriptDependenciesMessage([])).toBeDefined();
});

test("should get message", async () => {
  expect(getCreatedTsconfigMessage()).toBeDefined();
});
