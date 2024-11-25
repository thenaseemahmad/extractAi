import { NextFunction, Request, Response } from "express";
import { CustomError } from "@chrome-buildin-ai-naseem/errors";

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ error: err.serializeError() });
  }
  return res.status(400).send({ error: [{ message: "Something break" }] });
}