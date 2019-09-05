import { CompiledEndpoints, convertFileNameToRoute } from "./index";

interface RegisteredRoutes {
  routeName: string;
  method: string;
  fileName: string;
}

// TODO: support named parameters
export const findConflictingEndpoints = (endpoints: CompiledEndpoints) => {
  const conflictingEndpoints: string[] = [];
  const registeredRoutes: RegisteredRoutes[] = [];

  for (const [fileName, , extension] of endpoints) {
    const { routeName, method } = convertFileNameToRoute(fileName);
    const conflicts = registeredRoutes.filter(
      route =>
        route.routeName === routeName &&
        (route.method === method || method === "all")
    );

    registeredRoutes.push({
      routeName,
      method,
      fileName: `${fileName}.${extension}`
    });

    if (conflicts.length === 0) continue;

    conflictingEndpoints.push(`${fileName}.${extension}`);

    for (const conflict of conflicts) {
      if (conflictingEndpoints.includes(conflict.fileName)) continue;

      conflictingEndpoints.push(conflict.fileName);
    }
  }

  return conflictingEndpoints;
};
