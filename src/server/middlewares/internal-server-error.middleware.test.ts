import { internalServerErrorMiddleware } from "./internal-server-error.middleware";
import { SuddenApiError, INTERNAL_SERVER_ERROR } from "../errors";

test("should throw an internal server error", () => {
  let thrownError: Error | SuddenApiError | undefined;

  try {
    internalServerErrorMiddleware();
  } catch (err) {
    thrownError = err;
  }

  expect(thrownError).toEqual(INTERNAL_SERVER_ERROR);
});
