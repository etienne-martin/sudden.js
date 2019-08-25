import { notFoundMiddleware } from "./not-found.middleware";
import { SuddenApiError, NOT_FOUND } from "../errors";

test("should throw a not found error", () => {
  let thrownError: Error | SuddenApiError | undefined;

  try {
    notFoundMiddleware();
  } catch (err) {
    thrownError = err;
  }

  expect(thrownError).toEqual(NOT_FOUND);
});
