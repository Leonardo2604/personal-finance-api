import ApplicationException from './applicationException';

class ForbiddenException extends ApplicationException {
  constructor(message: string) {
    super(message, 403);
  }
}

export default ForbiddenException;
