import { Router } from 'express';
import { container } from 'tsyringe';

import EnsureAuthenticatedMiddleware from '../middlewares/ensureAuthenticatedMiddleware';
import EnsureResourceBelongsToUserMiddleware from '../middlewares/ensureResourceBelongsToUserMiddleware';

import IncomeTypeController from '../modules/financial/controllers/incomeTypeController';
import RouteRegister from '../shared/routes/routeRegister';

class IncomeTypeRouteRegister implements RouteRegister {
  private incomeTypeController: IncomeTypeController;

  private ensureAuthenticatedMiddleware: EnsureAuthenticatedMiddleware;

  private ensureResourceBelongsToUserMiddleware: EnsureResourceBelongsToUserMiddleware;

  constructor() {
    this.incomeTypeController = container.resolve(IncomeTypeController);
    this.ensureAuthenticatedMiddleware = container.resolve(
      EnsureAuthenticatedMiddleware,
    );
    this.ensureResourceBelongsToUserMiddleware = container.resolve(
      EnsureResourceBelongsToUserMiddleware,
    );
  }

  register(router: Router): void {
    router.get(
      '/users/:userId(\\d+)/income-types',
      this.ensureAuthenticatedMiddleware.handle,
      this.ensureResourceBelongsToUserMiddleware.handle,
      this.incomeTypeController.index,
    );
    router.post(
      '/users/:userId(\\d+)/income-types',
      this.ensureAuthenticatedMiddleware.handle,
      this.ensureResourceBelongsToUserMiddleware.handle,
      this.incomeTypeController.create,
    );
    router.put(
      '/users/:userId(\\d+)/income-types/:incomeTypeId(\\d+)',
      this.ensureAuthenticatedMiddleware.handle,
      this.ensureResourceBelongsToUserMiddleware.handle,
      this.incomeTypeController.update,
    );
    router.delete(
      '/users/:userId(\\d+)/income-types/:incomeTypeId(\\d+)',
      this.ensureAuthenticatedMiddleware.handle,
      this.ensureResourceBelongsToUserMiddleware.handle,
      this.incomeTypeController.delete,
    );
  }
}

export default IncomeTypeRouteRegister;
