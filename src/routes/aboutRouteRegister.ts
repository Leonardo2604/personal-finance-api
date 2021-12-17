import { Router } from 'express';
import AboutController from '../modules/about/controllers/aboutController';
import RouteRegister from '../shared/routes/routeRegister';

class AboutRouteRegister implements RouteRegister {
  private aboutController: AboutController;

  constructor() {
    this.aboutController = new AboutController();
  }

  register(router: Router) {
    router.get('/', this.aboutController.getAbout);
  }
}

export default AboutRouteRegister;
