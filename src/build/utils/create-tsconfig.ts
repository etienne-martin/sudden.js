import { fs } from "../../utils";
import path from "path";

export const createTsconfig = async (projectDir: string) => {
  const defaultTsconfig = {
    compilerOptions: {
      module: "esnext",
      moduleResolution: "node",
      lib: ["es6"],
      skipLibCheck: true,
      strict: true,
      noImplicitAny: true,
      noImplicitThis: true,
      strictNullChecks: true,
      noUnusedLocals: true,
      esModuleInterop: true
    },
    exclude: ["node_modules"],
    include: ["**/*.ts"]
  };

  await fs.writeFile(
    path.resolve(projectDir, "tsconfig.json"),
    JSON.stringify(defaultTsconfig, null, 2)
  );
};
