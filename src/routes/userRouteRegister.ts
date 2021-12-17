import { Router } from 'express';
import { container } from 'tsyringe';
import EnsureAuthenticatedMiddleware from '../middlewares/ensureAuthenticatedMiddleware';

import UserController from '../modules/auth/controllers/userController';
import RouteRegister from '../shared/routes/routeRegister';

class UserRouteRegister implements RouteRegister {
  private userController: UserController;

  private ensureAuthenticatedMiddleware: EnsureAuthenticatedMiddleware;

  constructor() {
    this.userController = container.resolve(UserController);
    this.ensureAuthenticatedMiddleware = container.resolve(
      EnsureAuthenticatedMiddleware,
    );
  }

  register(router: Router): void {
    router.get(
      '/users',
      this.ensureAuthenticatedMiddleware.handle,
      this.userController.index,
    );

    router.post(
      '/users',
      this.ensureAuthenticatedMiddleware.handle,
      this.userController.create,
    );

    router.delete(
      '/users/:userId(\\d+)',
      this.ensureAuthenticatedMiddleware.handle,
      this.userController.delete,
    );
  }
}

export default UserRouteRegister;
