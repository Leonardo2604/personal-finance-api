import { NextFunction, Request, Response } from 'express';
import ApplicationException from '../exceptions/applicationException';

class ErrorHandlerMiddleware {
  handle(
    error: Error,
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    if (error instanceof ApplicationException) {
      return response.status(error.getHttpCode()).json({
        message: error.message,
      });
    }

    console.log(error);

    return response.status(500).json({
      message: error.message,
      error,
    });
  }
}

export default ErrorHandlerMiddleware;
