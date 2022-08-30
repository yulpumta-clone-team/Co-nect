export class HttpError extends Error {
  constructor(message, httpStatus) {
    super(message);
    this.name = 'HttpError';
    this.httpStatus = httpStatus;
  }
}
