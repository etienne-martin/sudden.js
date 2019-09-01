import webpack from "webpack";

export interface BuildManifest {
  created: number;
  mode: "development" | "production" | "none" | undefined;
  hash: string;
  version: string;
}

interface Options {
  version: string;
}

export class BuildManifestPlugin {
  private version: string;

  public constructor({ version }: Options) {
    this.version = version;
  }

  public apply(compiler: webpack.Compiler) {
    compiler.hooks.emit.tapPromise(
      "BuildManifestPlugin",
      async compilation =>
        new Promise(resolve => {
          const manifest: BuildManifest = {
            created: +new Date(),
            mode: compiler.options.mode,
            hash: compilation.hash || "",
            version: this.version
          };

          const stringifiedManifest = JSON.stringify(manifest, null, 2);

          // Insert the manifest into the webpack build as a new file asset:
          compilation.assets["build-manifest.json"] = {
            source: () => {
              return stringifiedManifest;
            },
            size: () => {
              return stringifiedManifest.length;
            }
          };

          resolve();
        })
    );
  }
}
