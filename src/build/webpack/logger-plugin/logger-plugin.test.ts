import webpack from "webpack";
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

  compiler.run(async (err, stats) => {
    expect(err).toBe(null);
    expect(stats.hasErrors()).toBe(false);

    expect(spy).toHaveBeenCalledTimes(2);

    spy.mockRestore();

    done();
  });
});
