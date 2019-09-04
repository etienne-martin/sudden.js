import webpack from "webpack";

export interface BuildManifest {
  created: number;
  mode: "development" | "production" | "none" | undefined;
  hash: string;
  runtimeVersion: string;
}

interface Options {
  runtimeVersion: string;
}

export class BuildManifestPlugin {
  private runtimeVersion: string;

  public constructor({ runtimeVersion }: Options) {
    this.runtimeVersion = runtimeVersion;
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
            runtimeVersion: this.runtimeVersion
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
