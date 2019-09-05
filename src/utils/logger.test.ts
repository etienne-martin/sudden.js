import colors from "colors/safe";

import { logger } from "./logger";

test("logger.wait()", () => {
  const spy = jest.spyOn(console, "log").mockImplementation();

  logger.wait("wait message");
  expect(spy).toHaveBeenCalledWith(colors.cyan("[ wait ] "), "wait message");
  spy.mockRestore();
});

test("logger.info()", () => {
  const spy = jest.spyOn(console, "info").mockImplementation();

  logger.info("info message");
  expect(spy).toHaveBeenCalledWith(colors.white("[ info ] "), "info message");
  spy.mockRestore();
});

test("logger.ready()", () => {
  const spy = jest.spyOn(console, "log").mockImplementation();

  logger.ready("ready message");
  expect(spy).toHaveBeenCalledWith(colors.green("[ ready ]"), "ready message");

  spy.mockRestore();
});

test("logger.event()", () => {
  const spy = jest.spyOn(console, "log").mockImplementation();

  logger.event("event message");
  expect(spy).toHaveBeenCalledWith(
    colors.magenta("[ event ]"),
    "event message"
  );

  spy.mockRestore();
});

test("logger.warn()", () => {
  const spy = jest.spyOn(console, "warn").mockImplementation();

  logger.warn("warn message");
  expect(spy).toHaveBeenCalledWith(colors.yellow("[ warn ]"), "warn message");

  spy.mockRestore();
});

test("logger.error()", () => {
  const spy = jest.spyOn(console, "error").mockImplementation();

  logger.error("error message");
  expect(spy).toHaveBeenCalledWith(colors.red("[ error ]"), "error message");
  spy.mockRestore();
});

test("logger.error() (ts-type-checker)", () => {
  const spy = jest.spyOn(console, "error").mockImplementation();

  logger.error({
    message: "This is a type checker error",
    file: "",
    location: "",
    rawMessage: ""
  });

  expect(spy).toHaveBeenCalledWith(
    colors.red("[ error ]"),
    "This is a type checker error"
  );
});
