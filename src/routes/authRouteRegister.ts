import { Router } from 'express';
import { container } from 'tsyringe';
import AuthController from '../modules/auth/controllers/authController';

import RouteRegister from '../shared/routes/routeRegister';

class AuthRouteRegister implements RouteRegister {
  private authController: AuthController;

  constructor() {
    this.authController = container.resolve(AuthController);
  }

  register(router: Router): void {
    router.post('/authenticate', this.authController.authenticate);
    router.post('/renew-token', this.authController.renewToken);
  }
}

export default AuthRouteRegister;
