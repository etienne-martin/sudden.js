import colors from "colors/safe";

import { errorLoggerMiddleware } from "./error-logger.middleware";

test("should log errors to the console", () => {
  const error = new Error("This is an error");
  const consoleSpy = jest.spyOn(console, "error").mockImplementation();
  const mockedReq: any = {};
  const mockedRes: any = {
    status: jest.fn(),
    json: jest.fn()
  };

  errorLoggerMiddleware(error, mockedReq, mockedRes, () => undefined);

  expect(consoleSpy).toHaveBeenCalledWith(colors.red("[ error ]"), error);

  consoleSpy.mockRestore();
});
