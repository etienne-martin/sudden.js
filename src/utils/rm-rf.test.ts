import { rmRf } from "./rm-rf";
import { fs } from "./fs";

test("should delete file or folder", async () => {

  if (!await fs.exists("/tmp/dummy")) {
    await fs.mkdir("/tmp/dummy");
  }

  expect(await fs.exists("/tmp/dummy")).toBe(true);

  await rmRf("/tmp/dummy");

  expect(await fs.exists("/tmp/dummy")).toBe(false);
});

test("should delete file or folder (recursive)", async () => {

  if (!await fs.exists("/tmp/dummy")) {
    await fs.mkdir("/tmp/dummy");
  }

  if (!await fs.exists("/tmp/dummy/deep")) {
    await fs.mkdir("/tmp/dummy/deep");
  }

  expect(await fs.exists("/tmp/dummy/deep")).toBe(true);

  await rmRf("/tmp/dummy");

  expect(await fs.exists("/tmp/dummy/deep")).toBe(false);
});
