import rimraf from "rimraf";

export const rmRf = (path: string) => {
  return new Promise(resolve => {
    rimraf(path, () => {
      resolve();
    });
  });
};
