import { securityMiddleware } from "./security.middleware";

test("should add Strict-Transport-Security header to any response", () => {
  const mockedReq: any = {};
  const mockedRes: any = {
    set: jest.fn()
  };
  const next = jest.fn();

  securityMiddleware(mockedReq, mockedRes, next);

  expect(mockedRes.set).toHaveBeenCalledWith(
    "Strict-Transport-Security",
    `max-age=${60 * 60 * 24 * 365}; includeSubDomains; preload`
  );
  expect(next).toHaveBeenCalledWith();
});
