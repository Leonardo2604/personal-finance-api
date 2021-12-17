import { Router } from 'express';

interface RouteRegister {
  register(router: Router): void;
}

export default RouteRegister;
