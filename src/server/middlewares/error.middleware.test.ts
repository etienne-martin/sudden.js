import { errorMiddleware } from "./error.middleware";
import { NOT_FOUND, INTERNAL_SERVER_ERROR } from "../errors";

test("should output known errors in the response", () => {
  const mockedReq: any = {};
  const mockedRes: any = {
    status: jest.fn(),
    json: jest.fn()
  };

  const statusSpy = jest.spyOn(mockedRes, "status");
  const jsonSpy = jest.spyOn(mockedRes, "json");

  errorMiddleware(NOT_FOUND, mockedReq, mockedRes, () => undefined);

  expect(statusSpy).toHaveBeenCalledWith(NOT_FOUND.statusCode);
  expect(jsonSpy).toHaveBeenCalledWith({
    error: {
      message: NOT_FOUND.message,
      code: NOT_FOUND.code
    }
  });
});

test("should default to a 500 error for unexpected errors", () => {
  const mockedReq: any = {};
  const mockedRes: any = {
    status: jest.fn(),
    json: jest.fn()
  };

  const statusSpy = jest.spyOn(mockedRes, "status");
  const jsonSpy = jest.spyOn(mockedRes, "json");

  errorMiddleware(
    new Error("This is an error"),
    mockedReq,
    mockedRes,
    () => undefined
  );

  expect(statusSpy).toHaveBeenCalledWith(INTERNAL_SERVER_ERROR.statusCode);
  expect(jsonSpy).toHaveBeenCalledWith({
    error: {
      message: INTERNAL_SERVER_ERROR.message,
      code: INTERNAL_SERVER_ERROR.code
    }
  });
});
