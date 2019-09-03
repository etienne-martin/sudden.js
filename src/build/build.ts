import webpack from "webpack";
import nodeExternals from "webpack-node-externals";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import path from "path";

import { BuildManifestPlugin } from "./webpack/build-manifest-plugin";
import { WebpackLoggerPlugin } from "./webpack/logger-plugin";
import {
  getCreatedTsconfigMessage,
  getMissingTypeScriptDependenciesMessage
} from "./messages";
import {
  createTsconfig,
  findMissingTypeScriptDependencies,
  tsconfigExists
} from "./utils";

interface Logger {
  wait: (...messages: any[]) => void;
  error: (...messages: any[]) => void;
  info: (...messages: any[]) => void;
  warn: (...messages: any[]) => void;
  ready: (...messages: any[]) => void;
  event: (...messages: any[]) => void;
}

interface BuildOptions {
  mode: "production" | "development";
  context: string;
  runtimeVersion: string;
  projectDir: string;
  outputDir: string;
  entry: string;
  typescript?: boolean;
  logger: Logger;
  watch?: boolean;
  onCompilationEnd?: () => void;
  onError?: (err: Error | any[]) => void;
}

export const build = async ({
  mode,
  context,
  runtimeVersion,
  projectDir,
  outputDir,
  entry,
  typescript,
  logger,
  watch,
  onError,
  onCompilationEnd
}: BuildOptions) =>
  new Promise(async (resolve, reject) => {
    // Skip build if there's no file to compile
    if (Object.entries(entry).length === 0) return resolve();

    const webpackPlugins: webpack.Plugin[] = [
      new BuildManifestPlugin({
        runtimeVersion
      }),
      new WebpackLoggerPlugin({
        logger
      })
    ];

    if (typescript) {
      const missingTypeScriptDependencies = await findMissingTypeScriptDependencies(
        projectDir
      );

      if (missingTypeScriptDependencies.length > 0) {
        console.log(
          getMissingTypeScriptDependenciesMessage(missingTypeScriptDependencies)
        );

        return process.exit(1);
      }

      if (!(await tsconfigExists(projectDir))) {
        await createTsconfig(projectDir);
        console.log(getCreatedTsconfigMessage());
      }

      webpackPlugins.push(
        new ForkTsCheckerWebpackPlugin({
          typescript: eval("require").resolve(
            path.resolve(projectDir, "node_modules/typescript")
          ),
          tsconfig: path.resolve(projectDir, "tsconfig.json"),
          async: false,
          logger: {
            error: logger.error,
            warn: logger.warn,
            info: () => undefined
          },
          formatter: "codeframe"
        })
      );
    }

    if (watch) {
      webpackPlugins.push(
        new webpack.WatchIgnorePlugin([entry])
      );
    }

    const compiler = webpack({
      mode,
      target: "node",
      context,
      entry: {
        endpoints: entry
      },
      node: {
        __filename: true,
        __dirname: true
      },
      output: {
        path: outputDir,
        filename: "[name].js",
        libraryTarget: "commonjs2"
      },
      resolve: {
        extensions: [".ts", ".js", ".json"]
      },
      module: {
        rules: [
          {
            test: /\.(js|ts)$/,
            use: [
              {
                loader: "babel-loader",
                options: {
                  presets: [
                    eval("require").resolve("@babel/preset-typescript"),
                    [
                      eval("require").resolve("@babel/preset-env"),
                      {
                        targets: {
                          node: "8"
                        }
                      }
                    ]
                  ]
                }
              }
            ],
            exclude: [/node_modules/]
          }
        ]
      },
      externals: [nodeExternals()],
      plugins: webpackPlugins
    });

    if (watch) {
      compiler.watch(
        {
          aggregateTimeout: 250,
          poll: undefined
        },
        async (err, stats) => {
          // Fatal webpack errors (wrong configuration, etc)
          if (err) {
            onError && (await onError(err));
            process.exit(1);

            return;
          }

          // Compilation errors (missing modules, syntax errors, etc)
          if (stats.hasErrors()) {
            onError && (await onError(stats.compilation.errors));
          }

          onCompilationEnd && (await onCompilationEnd());
          resolve();
        }
      );

      return;
    }

    compiler.run((err, stats) => {
      // Fatal webpack errors (wrong configuration, etc)
      if (err) return reject(err);

      // Compilation errors (missing modules, syntax errors, etc)
      if (stats.hasErrors()) {
        return reject(stats.compilation.errors);
      }

      resolve();
    });
  });
