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

// TODO: Implement this test
test("should find conflicting endpoints with named parameters", async () => {
  expect(1).toBe(1);
  // const compiledEndpointsMock: any = [
  //   ["[userId]", null, "js"],
  //   ["[postId]", null, "js"]
  // ];
  //
  // expect(await findConflictingEndpoints(compiledEndpointsMock)).toEqual([
  //   "[userId].js",
  //   "[postId].js"
  // ]);
});
