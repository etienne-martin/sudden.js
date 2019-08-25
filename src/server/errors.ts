export interface SuddenApiError {
  type: "SuddenApiError";
  statusCode: 404 | 500;
  message: string;
  code: string;
}

export const NOT_FOUND: SuddenApiError = {
  type: "SuddenApiError",
  statusCode: 404,
  message: "Unrecognized request URL.",
  code: "not_found"
};

export const INTERNAL_SERVER_ERROR: SuddenApiError = {
  type: "SuddenApiError",
  statusCode: 500,
  message: "An error occurred while processing the request.",
  code: "internal_server_error"
};
