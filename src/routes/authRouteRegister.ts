import { Router } from 'express';
import { container } from 'tsyringe';
import EnsureAuthenticatedMiddleware from '../middlewares/ensureAuthenticatedMiddleware';
import AuthController from '../modules/auth/controllers/authController';

import RouteRegister from '../shared/routes/routeRegister';

class AuthRouteRegister implements RouteRegister {
  private authController: AuthController;

  private ensureAuthenticatedMiddleware: EnsureAuthenticatedMiddleware;

  constructor() {
    this.authController = container.resolve(AuthController);
    this.ensureAuthenticatedMiddleware = container.resolve(
      EnsureAuthenticatedMiddleware,
    );
  }

  register(router: Router): void {
    router.post('/authenticate', this.authController.authenticate);
    router.post('/renew-token', this.authController.renewToken);
    router.get(
      '/me',
      this.ensureAuthenticatedMiddleware.handle,
      this.authController.me,
    );
  }
}

export default AuthRouteRegister;
