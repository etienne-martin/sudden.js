import rimraf from "rimraf";

export const rmRf = (path: string) =>
  new Promise(resolve => {
    rimraf(path, () => {
      resolve();
    });
  });
