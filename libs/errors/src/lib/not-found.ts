import { CustomError } from "./custom-error";

export class NotFoundError extends CustomError{
  statusCode = 404;
  message: string;
  constructor(){
    super();

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
  serializeError(): { message: string; field?: string; }[] {
    return [{message:"Path not found", field:'path error'}]
  }
}