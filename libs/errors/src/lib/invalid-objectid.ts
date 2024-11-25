import { CustomError } from "./custom-error";

export class InvalidObjectId extends CustomError {
  statusCode= 400;
  error: string;
  constructor(error: string) {
    super()
    this.error = error;
    Object.setPrototypeOf(this, InvalidObjectId.prototype);
  }
  serializeError(): { message: string; field?: string; }[] {
    return [{ message: this.error }]
  }
}