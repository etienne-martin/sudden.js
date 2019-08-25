import { fs } from "./fs";

test("should return promises", async () => {
  for (const func of Object.values(fs)) {
    expect(func.toString()).toContain("Promise");
  }
});
