abstract class ApplicationException extends Error {
  protected httpCode: number;

  constructor(message: string, httpCode: number) {
    super(message);
    this.httpCode = httpCode;
  }

  public getHttpCode(): number {
    return this.httpCode;
  }
}

export default ApplicationException;
