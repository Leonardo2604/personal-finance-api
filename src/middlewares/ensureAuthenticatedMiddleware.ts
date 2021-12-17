import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';
import UnauthorizedException from '../exceptions/unauthorizedException';
import AuthService from '../modules/auth/services/authService';

@injectable()
class EnsureAuthenticatedMiddleware {
  constructor(@inject('AuthService') private authService: AuthService) {
    this.handle = this.handle.bind(this);
  }

  async handle(request: Request, response: Response, next: NextFunction) {
    const bearerToken = request.headers.authorization;

    if (!bearerToken) {
      throw new UnauthorizedException('You must provide authorization header.');
    }

    const [, token] = bearerToken.split(' ');
    const tokenIsValid = this.authService.isAuthenticated(token);

    if (!tokenIsValid) {
      return next(new UnauthorizedException('Invalid token.'));
    }

    const user = await this.authService.getUserByToken(token);
    request.auth = { user };

    return next();
  }
}

export default EnsureAuthenticatedMiddleware;
