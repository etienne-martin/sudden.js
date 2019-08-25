import { getBuildManifest } from "./manifest";
import { fs, rmRf } from "../utils";

test("should return undefined if build manifest does not exist", async () => {
  expect(getBuildManifest("/tmp/nonexistent-dir")).toBe(undefined);
});

test("should return the manifest if it exists", async () => {
  const manifest = {
    test: 1
  };

  await rmRf("/tmp/dummy-dir");
  await fs.mkdir("/tmp/dummy-dir");
  await fs.writeFile(
    "/tmp/dummy-dir/build-manifest.json",
    JSON.stringify(manifest)
  );

  expect(getBuildManifest("/tmp/dummy-dir")).toEqual(manifest);
});
