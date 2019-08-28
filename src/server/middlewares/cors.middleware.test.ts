import { corsMiddleware } from "./cors.middleware";

test("should add Access-Control-Allow-Origin header to any response", () => {
  const mockedReq: any = {};
  const mockedRes: any = {
    set: jest.fn()
  };
  const next = jest.fn();

  corsMiddleware(mockedReq, mockedRes, next);

  expect(mockedRes.set).toHaveBeenCalledWith(
    "Access-Control-Allow-Origin",
    "*"
  );
  expect(next).toHaveBeenCalledWith();
});

test("should add Access-Control-Max-Age header to any response", () => {
  const mockedReq: any = {};
  const mockedRes: any = {
    set: jest.fn()
  };
  const next = jest.fn();

  corsMiddleware(mockedReq, mockedRes, next);

  expect(mockedRes.set).toHaveBeenCalledWith("Access-Control-Max-Age", "300");
  expect(next).toHaveBeenCalledWith();
});
