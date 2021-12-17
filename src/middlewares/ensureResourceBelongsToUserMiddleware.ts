import { NextFunction, Request, Response } from 'express';
import { injectable } from 'tsyringe';
import BusinessException from '../exceptions/businessException';
import ForbiddenException from '../exceptions/forbiddenException';
import UnauthorizedException from '../exceptions/unauthorizedException';

@injectable()
class EnsureResourceBelongsToUserMiddleware {
  handle(request: Request, response: Response, next: NextFunction) {
    const { user } = request.auth;
    const { userId } = request.params;

    if (!user) {
      throw new UnauthorizedException('You must be authenticated.');
    }

    if (!userId) {
      throw new BusinessException('userId not provided.');
    }

    if (user.id !== Number(userId)) {
      throw new ForbiddenException('Resource not available.');
    }

    return next();
  }
}

export default EnsureResourceBelongsToUserMiddleware;
