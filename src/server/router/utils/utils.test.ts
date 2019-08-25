import { convertFileNameToRoute } from "./";

describe("router utils", () => {
  describe("convertFileNameToRoute()", () => {
    test("should remove index", () => {
      expect(convertFileNameToRoute("index")).toEqual({
        method: "all", routeName: "/"
      });
    });

    test("should remove index (nested)", () => {
      expect(convertFileNameToRoute("foo/bar/index")).toEqual({
        method: "all", routeName: "/foo/bar"
      });
    });

    test("should add leading slash", () => {
      expect(convertFileNameToRoute("foo/bar")).toEqual({
        method: "all", routeName: "/foo/bar"
      });
    });

    test("should convert square brackets params to express params", () => {
      expect(convertFileNameToRoute("[slug]")).toEqual({
        method: "all", routeName: "/:slug"
      });
    });

    test("should convert square brackets params to express params (multiple params)", () => {
      expect(convertFileNameToRoute("[test]/[test2]")).toEqual({
        method: "all", routeName: "/:test/:test2"
      });
    });

    test("should extract method from file name", () => {
      expect(convertFileNameToRoute("dummy.get")).toEqual({
        method: "get", routeName: "/dummy"
      });
    });

    test("should extract method from file name (case insensitive)", () => {
      expect(convertFileNameToRoute("dummy.GET")).toEqual({
        method: "get", routeName: "/dummy"
      });
    });
  });
});
