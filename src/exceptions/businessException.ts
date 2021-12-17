import ApplicationException from './applicationException';

class BusinessException extends ApplicationException {
  constructor(message: string) {
    super(message, 400);
  }
}

export default BusinessException;
