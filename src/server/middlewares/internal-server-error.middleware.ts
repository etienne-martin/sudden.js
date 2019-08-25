import { INTERNAL_SERVER_ERROR } from "../errors";

export const internalServerErrorMiddleware = () => {
  throw INTERNAL_SERVER_ERROR;
};
