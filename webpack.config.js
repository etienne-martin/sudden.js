const nodeExternals = require("webpack-node-externals");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

module.exports = (env, argv) => {
  const IS_DEV = argv.mode === "development";

  return {
    mode: "production",
    target: "node",
    entry: ["./src/index.ts"],
    output: {
      filename: "index.js",
      path: __dirname + "/dist"
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
                  "@babel/typescript",
                  [
                    "@babel/preset-env",
                    {
                      targets: {
                        node: "8"
                      }
                    }
                  ]
                ]
              }
            },
            {
              loader: "eslint-loader",
              options: {
                emitWarning: true,
                emitError: !IS_DEV
              }
            }
          ],
          exclude: [/node_modules/]
        }
      ]
    },
    externals: [nodeExternals()],
    plugins: [
      new ForkTsCheckerWebpackPlugin({
        formatter: "codeframe"
      })
    ]
  };
};
