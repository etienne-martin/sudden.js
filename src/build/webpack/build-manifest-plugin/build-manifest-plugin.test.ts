import webpack from "webpack";
import { BuildManifestPlugin } from "./build-manifest-plugin";
import { fs, noCacheRequire, rmRf } from "../../../utils";

test("should create a build manifest", async done => {
  const expectedBuildManifest: any = {
    created: 1567538208558,
    hash: "3e26c338dd452d047a8d",
    mode: "production",
    runtimeVersion: "1.0.0"
  };

  const outputPath = `/tmp/build-manifest-plugin`;
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
      new BuildManifestPlugin({
        runtimeVersion: "1.0.0"
      })
    ]
  });

  compiler.run(async (err, stats) => {
    expect(err).toBe(null);
    expect(stats.hasErrors()).toBe(false);

    const buildManifestPath = `${outputPath}/build-manifest.json`;

    expect(await fs.exists(buildManifestPath));

    const buildManifest = noCacheRequire(buildManifestPath);

    for (const [property] of Object.entries(buildManifest)) {
      expect(expectedBuildManifest[property]).toBeDefined();
    }

    expect(typeof buildManifest.created).toBe("number");
    expect(buildManifest.hash).toBe("3e26c338dd452d047a8d");
    expect(buildManifest.mode).toBe("production");
    expect(buildManifest.runtimeVersion).toBe("1.0.0");

    done();
  });
});
