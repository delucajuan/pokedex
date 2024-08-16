import { NextFunction, Request, Response } from "express";
import { HttpError } from "../types/types";

const errors = (
  err: HttpError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
) => {
  const development = process.env.NODE_ENV === "development";
  const errorResponse: { status: number; message: string; error?: unknown } = {
    status: err.status ?? 500,
    // No stacktraces leaked to user unless in development environment or status 400, 401, 404
    message:
      development || [400, 401, 404].includes(err.status ?? 0)
        ? err.message
        : "Internal server error",
  };

  // Include error in development or if status is 400. Do not include it if only has status in it.
  if ((development || err.status === 400) && Object.keys(err).length > 1) {
    errorResponse.error = err.cause || err;
  }

  // Log if internal error
  if (errorResponse.status === 500) {
    console.error(err.cause || err.message);
  }
  res.status(errorResponse.status).json(errorResponse);
};

export default errors;
