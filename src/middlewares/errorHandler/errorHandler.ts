import type { ErrorRequestHandler } from "express";

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    errors: err.messages || [err.message],
  });
};

export default errorHandler;
