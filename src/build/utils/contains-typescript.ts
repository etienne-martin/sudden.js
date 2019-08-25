import glob from "glob";

export const containsTypeScript = async (dir: string): Promise<boolean> =>
  new Promise((resolve, reject) => {
    glob(
      `**/*.ts`,
      {
        cwd: dir
      },
      (err, files) => {
        if (err) return reject(err);

        resolve(files.length > 0);
      }
    );
  });
