import nodeFs from "fs";
import { promisify } from "util";

export const fs = {
  exists: promisify(nodeFs.exists),
  writeFile: promisify(nodeFs.writeFile),
  mkdir: promisify(nodeFs.mkdir),
  mkdtemp: promisify(nodeFs.mkdtemp),
  realpath: promisify(nodeFs.realpath)
};
