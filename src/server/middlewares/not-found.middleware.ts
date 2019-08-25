import { NOT_FOUND } from "../errors";

export const notFoundMiddleware = () => {
  throw NOT_FOUND;
};
