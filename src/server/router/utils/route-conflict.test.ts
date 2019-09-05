import { findConflictingEndpoints } from "./route-conflict";

test("should find conflicting endpoints", async () => {
  const compiledEndpointsMock: any = [
    ["index.get", null, "js"],
    ["index.get", null, "json"],
    ["index.post", null, "js"],
    ["index", null, "js"]
  ];

  expect(await findConflictingEndpoints(compiledEndpointsMock)).toEqual([
    "index.get.json",
    "index.get.js",
    "index.js",
    "index.post.js"
  ]);
});
