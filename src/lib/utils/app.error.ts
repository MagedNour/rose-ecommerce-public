export default class AppError extends Error {
  public message: string;
  public statusCode: number = 500;

  constructor(message: string, statusCode: number) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
  }
}
