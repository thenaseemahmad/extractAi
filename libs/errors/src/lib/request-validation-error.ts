import { ValidationError } from "express-validator";
import { CustomError } from "./custom-error"

export class RequestValidationError extends CustomError {
  errors: ValidationError[];
  statusCode = 400;
  constructor(errors: ValidationError[]) {
    super()
    this.errors = errors;
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeError() {
    const errObj = this.errors.map((error) => {
      return { message: error.msg }
    });
    return errObj;
  }
}