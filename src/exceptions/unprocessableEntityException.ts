import ApplicationException from './applicationException';

class UnprocessableEntityException extends ApplicationException {
  private errors: any[];

  constructor(errors: any[]) {
    super('', 422);
    this.errors = errors;
  }

  public getErrors(): any[] {
    return this.errors;
  }
}

export default UnprocessableEntityException;
