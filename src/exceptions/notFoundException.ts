import ApplicationException from './applicationException';

class NotFoundException extends ApplicationException {
  constructor(message: string) {
    super(message, 404);
  }
}

export default NotFoundException;
