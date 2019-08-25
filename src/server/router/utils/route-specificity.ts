import { mapRouteParams } from "./route-params";
import { convertFileNameToRoute, removeMethodFromFileName } from "./index";

export const calculateRouteSpecificity = (fileName: string) => {
  // "all" method is less specific
  // The more params the less specific
  // The more slash the more specific
  // wildcard slugs are less specific (i.e. [slug].js vs post-[postId].js)
  // the more chars (don't count params) the more specific (i.e. a[slug].js vs a-[slug].js)

  const { routeName, method } = convertFileNameToRoute(fileName);
  let specificity = 0;

  // "all" method is less specific
  if (method === "all") specificity--;

  // The more params the less specific
  specificity -= (fileName.match(/(\[.*?])/g) || []).length;

  // The more slash the more specific
  specificity += (routeName.match(/\//g) || []).length;

  let paramsCounter = mapRouteParams(`/${fileName}`, () => "[PARAM]");

  paramsCounter = removeMethodFromFileName(paramsCounter);
  paramsCounter = `${paramsCounter}/`;

  // wildcard slugs are less specific
  specificity -= (paramsCounter.match(/\/\[PARAM]\//g) || []).length;

  // The more chars the more specific
  let charCounter = removeMethodFromFileName(fileName);

  charCounter = mapRouteParams(charCounter, () => "");
  charCounter = charCounter.replace(/\//g, "");

  specificity += charCounter.length;

  return specificity;
};
