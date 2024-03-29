import webpack from "webpack";
import colors from "colors/safe";

interface PluginOptions {
  logger: Logger;
}

interface Logger {
  wait: (...messages: any[]) => void;
  error: (...messages: any[]) => void;
  info: (...messages: any[]) => void;
  warn: (...messages: any[]) => void;
  ready: (...messages: any[]) => void;
  event: (...messages: any[]) => void;
}

export class LoggerPlugin {
  private readonly logger: Logger;

  public constructor({ logger }: PluginOptions) {
    this.logger = logger;
  }

  public apply(compiler: webpack.Compiler) {
    const logger = this.logger;
    const mode = compiler.options.mode;

    compiler.hooks.watchRun.tap("WebpackLoggerPlugin", compilation => {
      const watcher = (
        (compilation as any).watchFileSystem.wfs ||
        (compilation as any).watchFileSystem
      ).watcher;
      const changedTimes = watcher.mtimes;

      Object.keys(changedTimes).forEach(file => {
        logger.event(`file change detected: ${file}`);
      });
    });

    compiler.hooks.compilation.tap("WebpackLoggerPlugin", () => {
      if (mode === "production") {
        return logger.wait("creating an optimized production build ...");
      }

      logger.wait("compiling ...");
    });

    compiler.hooks.done.tap("WebpackLoggerPlugin", stats => {
      // Compilation errors (missing modules, syntax errors, etc)
      if (stats.hasErrors()) {
        if (mode === "production") {
          logger.error(colors.red("Failed to compile."));
        } else {
          logger.info("compiled with errors");
        }
      } // Compilation warnings
      else if (stats.hasWarnings()) {
        logger.info("compiled with warnings");
      } else {
        logger.ready("compiled successfully");
      }

      stats.compilation.warnings.map(warning => logger.warn(warning));
      stats.compilation.errors.map(error => logger.error(error));
    });
  }
}
