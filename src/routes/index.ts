import { Router } from 'express';
import AboutRouteRegister from './aboutRouteRegister';
import AuthRouteRegister from './authRouteRegister';
import IncomeTypeRouteRegister from './incomeTypeRouteRegister';
import UserRouteRegister from './userRouteRegister';

class Routes {
  private static readonly routeRegisters = [
    AboutRouteRegister,
    AuthRouteRegister,
    UserRouteRegister,
    IncomeTypeRouteRegister,
  ];

  static getRoutes(): Router {
    const router = Router();

    for (let i = 0; i < this.routeRegisters.length; i += 1) {
      const routerRegister = new this.routeRegisters[i]();
      routerRegister.register(router);
    }

    return router;
  }
}

export default Routes;
