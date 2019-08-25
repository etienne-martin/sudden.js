import { mapRouteParams } from "./route-params";

test("should map through all params", () => {
  const params: string[] = [];
  const result = mapRouteParams("/test/[param]/[param2]", (match: string) => {
    params.push(match);

    return `:${match}`;
  });

  expect(result).toBe("/test/:param/:param2");
  expect(params).toEqual(["param", "param2"]);
});
