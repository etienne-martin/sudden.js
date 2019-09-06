import webpack from "webpack";
import colors from "colors/safe";

import { LoggerPlugin } from "./logger-plugin";
import { fs, logger, rmRf } from "../../../utils";

test("should log webpack events to the console", async done => {
  const spy = jest.spyOn(console, "log").mockImplementation();
  const outputPath = `/tmp/logger-plugin`;
  const entryFilePath = `${outputPath}/entry.js`;

  await rmRf(outputPath);
  await fs.mkdir(outputPath);
  await fs.writeFile(entryFilePath, "export default 1;");

  const compiler = webpack({
    mode: "production",
    entry: entryFilePath,
    output: {
      path: outputPath
    },
    resolve: {
      extensions: [".js"]
    },
    plugins: [
      new LoggerPlugin({
        logger: logger
      })
    ]
  });

  compiler.run(async () => {
    expect(spy.mock.calls[0]).toEqual([
      colors.cyan("[ wait ] "),
      "creating an optimized production build ..."
    ]);
    expect(spy.mock.calls[1]).toEqual([
      colors.green("[ ready ]"),
      "compiled successfully"
    ]);

    spy.mockRestore();

    done();
  });
});

test("should log failed builds to the console", async done => {
  const consoleLogSpy = jest.spyOn(console, "log").mockImplementation();
  const consoleInfoSpy = jest.spyOn(console, "info").mockImplementation();
  const outputPath = `/tmp/logger-plugin`;
  const entryFilePath = `${outputPath}/entry.js`;

  await rmRf(outputPath);
  await fs.mkdir(outputPath);
  await fs.writeFile(entryFilePath, "import test from 'awdawd';");

  const compiler = webpack({
    mode: "development",
    entry: entryFilePath,
    output: {
      path: outputPath
    },
    resolve: {
      extensions: [".js"]
    },
    module: {
      rules: [
        {
          test: /\.(js)$/,
          use: [
            {
              loader: "babel-loader"
            }
          ]
        }
      ]
    },
    plugins: [
      new LoggerPlugin({
        logger: logger
      })
    ]
  });

  compiler.run(async () => {
    expect(consoleLogSpy.mock.calls[0]).toEqual([
      colors.cyan("[ wait ] "),
      "compiling ..."
    ]);

    expect(consoleInfoSpy.mock.calls[0]).toEqual([
      colors.white("[ info ] "),
      "compiled with errors"
    ]);

    consoleLogSpy.mockRestore();
    consoleInfoSpy.mockRestore();

    done();
  });
});

test("should log failed builds to the console", async done => {
  const consoleLogSpy = jest.spyOn(console, "log").mockImplementation();
  const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();
  const outputPath = `/tmp/logger-plugin`;
  const entryFilePath = `${outputPath}/entry.js`;

  await rmRf(outputPath);
  await fs.mkdir(outputPath);
  await fs.writeFile(entryFilePath, "import test from 'awdawd';");

  const compiler = webpack({
    mode: "production",
    entry: entryFilePath,
    output: {
      path: outputPath
    },
    resolve: {
      extensions: [".js"]
    },
    module: {
      rules: [
        {
          test: /\.(js)$/,
          use: [
            {
              loader: "babel-loader"
            }
          ]
        }
      ]
    },
    plugins: [
      new LoggerPlugin({
        logger: logger
      })
    ]
  });

  compiler.run(async () => {
    expect(consoleLogSpy.mock.calls[0]).toEqual([
      colors.cyan("[ wait ] "),
      "creating an optimized production build ..."
    ]);

    expect(consoleErrorSpy.mock.calls[0]).toEqual([
      colors.red("[ error ]"),
      colors.red("Failed to compile.")
    ]);

    consoleLogSpy.mockRestore();
    consoleErrorSpy.mockRestore();

    done();
  });
});

test("should log file changes", async done => {
  const spy = jest.spyOn(console, "log").mockImplementation();
  const outputPath = `/tmp/logger-plugin`;
  const entryFilePath = `${outputPath}/entry.js`;

  await rmRf(outputPath);
  await fs.mkdir(outputPath);
  await fs.writeFile(entryFilePath, "export default 1;");

  const compiler = webpack({
    mode: "development",
    entry: entryFilePath,
    output: {
      path: outputPath
    },
    resolve: {
      extensions: [".js"]
    },
    plugins: [
      new LoggerPlugin({
        logger: logger
      })
    ]
  });

  let i = 0;

  const watcher = compiler.watch(
    {
      aggregateTimeout: 250,
      poll: undefined
    },
    async () => {
      i++;

      if (i === 1) {
        // Trigger file change
        await fs.writeFile(entryFilePath, "export default 2;");
      }

      if (i === 2) {
        watcher.close(() => {
          expect(spy.mock.calls[2][0]).toEqual(colors.magenta("[ event ]"));
          expect(spy.mock.calls[2][1]).toContain(entryFilePath);

          spy.mockRestore();

          done();
        });
      }
    }
  );
});

test("should log warnings to the console", async done => {
  const consoleLogSpy = jest.spyOn(console, "log").mockImplementation();
  const spy = jest.spyOn(console, "warn").mockImplementation();
  const outputPath = `/tmp/logger-plugin`;
  const entryFilePath = `${outputPath}/entry.js`;

  await rmRf(outputPath);
  await fs.mkdir(outputPath);
  await fs.writeFile(entryFilePath, "export default  1;");

  const compiler = webpack({
    mode: "production",
    entry: entryFilePath,
    output: {
      path: outputPath
    },
    resolve: {
      extensions: [".js"]
    },
    module: {
      rules: [
        {
          test: /\.(js)$/,
          use: [
            {
              loader: "babel-loader"
            },
            {
              loader: "eslint-loader",
              options: {
                emitWarning: true,
                emitError: false,
                configFile: ".eslintrc.js"
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new LoggerPlugin({
        logger: logger
      })
    ]
  });

  compiler.run(async () => {
    expect(spy.mock.calls[0][0]).toEqual(colors.yellow("[ warn ]"));
    expect(spy.mock.calls[0][1]).toBeDefined();

    consoleLogSpy.mockRestore();
    spy.mockRestore();

    done();
  });
});
