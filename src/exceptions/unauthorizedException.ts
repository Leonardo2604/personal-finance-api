import ApplicationException from './applicationException';

class UnauthorizedException extends ApplicationException {
  constructor(message: string) {
    super(message, 401);
  }
}

export default UnauthorizedException;
