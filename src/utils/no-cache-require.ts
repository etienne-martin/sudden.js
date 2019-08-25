export const noCacheRequire = (module: string) => {
  // Evaluating require to prevent webpack from bundling
  const nodeRequire = eval("require");

  // Remove module from node's require cache
  delete nodeRequire.cache[nodeRequire.resolve(module)];

  return nodeRequire(module);
};
