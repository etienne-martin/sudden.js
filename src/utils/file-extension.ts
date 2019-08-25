export const getFileExtension = (fileName: string) => {
  const ext = /^.+\.([^.]+)$/.exec(fileName);

  return ext === null ? null : ext[1].toLowerCase();
};
