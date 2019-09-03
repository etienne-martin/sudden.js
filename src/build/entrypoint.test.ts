import { createEntrypoint } from "./entrypoint";
import { fs } from "../utils";

test("should create an entrypoint file", async () => {
  const entrypointPath = await createEntrypoint("/tmp/fakeSourceDir");

  expect(await fs.exists(entrypointPath)).toBe(true);
});
