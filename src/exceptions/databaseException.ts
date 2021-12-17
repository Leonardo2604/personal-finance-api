import ApplicationException from './applicationException';

class DatabaseException extends ApplicationException {
  constructor(message: string) {
    super(message, 500);
  }
}

export default DatabaseException;
