import { calculateRouteSpecificity } from "./route-specificity";

test("should calculate route specificity", () => {
  expect(typeof calculateRouteSpecificity("/test")).toBe("number");
});
