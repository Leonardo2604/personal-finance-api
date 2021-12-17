import ApplicationException from './applicationException';

class HttpException extends ApplicationException {
  constructor(message: string, httpCode: number) {
    super(message, httpCode);
  }
}

export default HttpException;
