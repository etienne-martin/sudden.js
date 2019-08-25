import path from "path";

import { mapRouteParams } from "./route-params";
import { calculateRouteSpecificity } from "./route-specificity";
import { getFileExtension, noCacheRequire } from "../../../utils";

type HttpMethod = "get" | "post" | "put" | "delete" | "patch";

interface Route {
  routeName: string;
  method: HttpMethod | "all";
}

type Endpoint = [string, string, number?];
type Endpoints = Endpoint[];
type CompiledEndpoint = [string, () => any, string];
type CompiledEndpoints = CompiledEndpoint[];

const HTTP_METHODS = ["get", "post", "put", "delete", "patch"];

export const convertFileNameToRoute = (fileName: string): Route => {
  const method = getMethodFromFileName(fileName);
  let routeName = removeMethodFromFileName(fileName);

  // Convert "index" to ""
  if (routeName.endsWith("index")) {
    routeName = routeName.substr(0, routeName.lastIndexOf("/index"));
  }

  // Add leading slash
  routeName = `/${routeName}`;

  // Convert square brackets params to express params
  // [userId] to :userId
  routeName = mapRouteParams(routeName, (match: string) => `:${match}`);

  return {
    routeName,
    method: method || "all"
  };
};

export const removeMethodFromFileName = (fileName: string) => {
  const method = getMethodFromFileName(fileName);

  if (method) {
    return fileName.substr(0, fileName.length - `.${method}`.length);
  }

  return fileName;
};

const getMethodFromFileName = (fileName: string): HttpMethod | undefined => {
  const fileExtension = getFileExtension(fileName);

  if (fileExtension && HTTP_METHODS.includes(fileExtension)) {
    return fileExtension as HttpMethod;
  }
};

// TODO: show error for conflicting endpoints
export const getCompiledEndpoints = (
  outputDir: string
): Promise<CompiledEndpoints> =>
  new Promise(async resolve => {
    const endpoints: Endpoints = [];
    const contextRequire = noCacheRequire(
      path.resolve(outputDir, "./endpoints")
    ).default;

    for (const filePath of contextRequire.keys()) {
      const fileExtension = getFileExtension(filePath);

      if (!fileExtension) continue;

      const endpoint = filePath.substr(
        2,
        filePath.length - (fileExtension.length + 1) - 2
      );

      endpoints.push([endpoint, filePath]);
    }

    const sortedEndpoint = sortEndpoints(endpoints);

    resolve(
      sortedEndpoint.map(([fileName, filePath]) => {
        const fileExtension = getFileExtension(filePath);

        return [
          fileName,
          () => contextRequire(filePath),
          fileExtension
        ] as CompiledEndpoint;
      })
    );
  });

const sortEndpoints = (endpoints: Endpoints): Endpoints => {
  // Sort alphabetically
  let sortedEndpoints = endpoints.sort((a, b) => {
    return a[0].localeCompare(b[0]);
  });

  const pointedEndpoints: Endpoints = sortedEndpoints.map(
    ([fileName, filePath]) => [
      fileName,
      filePath,
      calculateRouteSpecificity(fileName)
    ]
  );

  // Sort by specificity
  sortedEndpoints = pointedEndpoints.sort((a, b) => {
    if (a[2] === undefined || b[2] === undefined) return 0; // TS was complaining
    if (a[2] === b[2]) return 0;

    return a[2] > b[2] ? -1 : 1;
  });

  return sortedEndpoints.map(([fileName, filePath]) => [fileName, filePath]);
};
