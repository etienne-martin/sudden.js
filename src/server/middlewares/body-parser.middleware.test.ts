import { bodyParserMiddleware } from "./body-parser.middleware";

test("should set the middlewares in charge of parsing the request body", () => {
  expect(bodyParserMiddleware.length).toBe(3);
});
