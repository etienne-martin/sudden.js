import { getFileExtension } from "./file-extension";

test("should get the extension from filename", () => {
  expect(getFileExtension("test.txt")).toBe("txt");
  expect(getFileExtension("test.js")).toBe("js");
  expect(getFileExtension("text.test.js")).toBe("js");
  expect(getFileExtension("text/test/test.js")).toBe("js");
});

test("should return a lowercased extension", () => {
  expect(getFileExtension("test.JS")).toBe("js");
});

test("should return null for filenames without extensions", () => {
  expect(getFileExtension("text")).toBe(null);
  expect(getFileExtension("text/test/test")).toBe(null);
});
