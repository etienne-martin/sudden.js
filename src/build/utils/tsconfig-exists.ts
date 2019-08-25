import path from "path";

import { fs } from "../../utils";

export const tsconfigExists = async (projectDir: string): Promise<boolean> => {
  return await fs.exists(path.resolve(projectDir, "tsconfig.json"));
};
