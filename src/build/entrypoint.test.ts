import { createEntrypoint } from "./entrypoint";
import { fs, rmRf } from "../utils";

test("should create an entrypoint file", async () => {
  const outputDir = "/tmp/.sudden";

  await rmRf(outputDir);
  await createEntrypoint("/tmp/fakeSourceDir", outputDir);

  expect(await fs.exists(`${outputDir}/entrypoint.ts`)).toBe(true);
});
